import os
import toml
import re
import time
from pathlib import Path
from typing import Literal, List, Dict, Tuple, Optional, get_args
from utils.marker_utils import clean_markers, determine_answer
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.http import MediaIoBaseDownload
from googleapiclient.discovery import build, Resource
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json. (will also have to reactivate Google Drive API in the Google Cloud Console)
# SCOPES = ["https://www.googleapis.com/auth/documents.readonly"]
SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/documents'
]


def get_credentials():
    """Retrieve Google API credentials or authenticate if necessary."""
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)

        # save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    return creds


def get_markers(
    credentials: Credentials, 
    document_id: str
) -> Tuple[Dict[str, str], List[str]]:

    service = build("docs", "v1", credentials=credentials)
    document = service.documents().get(documentId=document_id).execute()

    text = document.get('body').get('content', [])
    text_elements = []
    
    # traverse the document structure to extract text
    for content in document.get('body', {}).get('content', []):
        if 'paragraph' in content:
            for element in content['paragraph']['elements']:
                if 'textRun' in element and 'content' in element['textRun']:
                    text_elements.append(element['textRun']['content'])

    context = set()

    for text in text_elements:
        markers = set(re.findall(r"\[.*?\]", text))
        local = [word[1:-1] for word in markers]
        context.update(local)

    context = list(context)
    cleaned_markers = clean_markers(context)

    new_to_old_marker = {}
    for idx in range(len(cleaned_markers)):
        old_marker = context[idx]
        new_marker = cleaned_markers[idx]
        new_to_old_marker[new_marker] = old_marker

    return new_to_old_marker, cleaned_markers


def document_exists(
    drive_service: Resource, 
    document_name: str
):
    response = drive_service.files().list(
        q=f"name='{document_name}' and mimeType='application/vnd.google-apps.document'",
        spaces='drive',
        fields='files(id, name)'
    ).execute()

    files = response.get('files', [])
    return len(files) > 0


def download_pdf_file(
    drive_service: Resource, 
    document_id: str,
    output_path: Path
):
    try:
        request = drive_service.files().export_media(
            fileId=document_id,
            mimeType='application/pdf'
        )
        with open(output_path, 'wb') as pdf_file:
            downloader = MediaIoBaseDownload(pdf_file, request)
            done = False
            while not done:
                status, done = downloader.next_chunk()
    except HttpError as err:
        print(f"An error occurred during PDF download: {err}")


def replace_markers(
    credentials: Credentials,
    document_id: str,
    new_document_name: str, 
    answers: Dict[str, str],
    markers: List[str],
    marker_map: Dict[str, str],
    exist_ok: bool = True,
    download_pdf: Optional[Path] = None
):
    drive_service = build("drive", "v3", credentials=credentials)

    # in this copying process, check if document of new_document_name exists alr or not (only matters if exist_ok is False)
    if not exist_ok and document_exists(drive_service, new_document_name):
        raise ValueError(f"A document with the name '{new_document_name}' already exists.")

    # copy the original document
    copied_document = drive_service.files().copy(
        fileId=document_id,
        body={"name": new_document_name}
    ).execute()
    copied_document_id = copied_document['id']

    # prepare replacement requests
    requests = []
    for marker in markers:
        full_marker = "[" + marker_map[marker] + "]"
        answer = answers[marker]
        requests.append({
            'replaceAllText': {
                'containsText': {
                    'text': full_marker,
                    'matchCase': False # will matchcase take care of case sensitivity? 
                },
                'replaceText': answer
            }
        })

    # apply replacements in the document
    try:
        service = build("docs", "v1", credentials=credentials)
        result = service.documents().batchUpdate(
            documentId=copied_document_id,
            body={'requests': requests}
        ).execute()
    except HttpError as err:
        print(f"An error occurred: {err}")

    # optionally, download the document as PDF
    if download_pdf:
        download_pdf_file(drive_service, copied_document_id, download_pdf)


if __name__ == "__main__":
    # load the document ID from "template.toml"
    with open("template.toml") as f:
        config = toml.load(f)
        TEMPLATE_DOCUMENT_ID = config["TEMPLATE_DOCUMENT_ID"]
    
    credentials = get_credentials()
    try:
        marker_map, markers = get_markers(credentials, TEMPLATE_DOCUMENT_ID) 
        # print(f"Marker map: {marker_map}", end='\n\n')
        # print(f"Markers: {markers}", end='\n\n')

        wworks_desc = Path("wworks_page.txt")
        answers = determine_answer(wworks_desc, markers)
        # print(answers, end='\n\n')
    
        start = time.time()
        replace_markers(
            credentials=credentials, 
            document_id=TEMPLATE_DOCUMENT_ID, 
            new_document_name="Cover Letter - Test",
            answers=answers, 
            markers=markers, 
            marker_map=marker_map,
            exist_ok=True,
            download_pdf=Path("output") / "cover_letter.pdf"
        )
        end = time.time()
        print(f"Time taken: {end - start}")

    except HttpError as err:
        print(f"Error occurred: {err}")


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def ok(self, root: Optional[TreeNode], targetSum: int, curr_nodes: list[int] = [0]):
        if root is None:
            return 0

        if root.left is None and root.right is None:
            curr_nodes.append(root.val + curr_nodes[-1])
            print(curr_nodes)
            cnt = 0
            for i in range(1, len(curr_nodes)):
                for j in range(i+1, len(curr_nodes)):
                    curr_sum = curr_nodes[j] - curr_nodes[i-1]
                    if curr_sum == targetSum:
                        cnt += 1
            return cnt
        else:
            curr_nodes.append(root.val + curr_nodes[-1])
            # print(root.val, curr_nodes)

            lft_cnt = 0
            if root.left is not None:
                # rev = curr_nodes.copy()
                # rev.append(root.left)
                lft_cnt = self.ok(root.left, targetSum, curr_nodes.copy())

            rght_cnt = 0
            if root.right is not None:
                rght_cnt = self.ok(root.right, targetSum, curr_nodes.copy())

            return lft_cnt + rght_cnt

    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        return self.ok(root, targetSum)
