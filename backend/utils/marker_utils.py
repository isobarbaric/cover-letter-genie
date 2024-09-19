from pathlib import Path
import re

valid_seps = [" ", "|", ",", ";", "\t", "_", "-", '"']
escaped_seps = [re.escape(sep) for sep in valid_seps]
regex_pattern = f"[{''.join(escaped_seps)}]+"

def clean_markers(markers: list[str]):
    # standardize separator for multi-word markers
    cleaned_markers = []

    for word in markers:
        # Strip leading/trailing whitespace
        stripped_word = word.strip()
        # Split the word based on the specified delimiters
        split_parts = re.split(regex_pattern, stripped_word)
        # Join the split parts with a single space
        cleaned_word = " ".join(split_parts)
        # Convert to proper case
        cleaned_word = " ".join(w.capitalize() for w in cleaned_word.split())
        # Remove special characters
        cleaned_word = re.sub(r"[^a-zA-Z0-9 ]", "", cleaned_word)
        cleaned_markers.append(cleaned_word)

    # don't want to remove duplicates in case of multiple markers with the same name, but with slight deviations in the exact spelling
    # remove duplicates, whilst preserving order
    # cleaned_markers = list(dict.fromkeys(cleaned_markers))

    return cleaned_markers


def determine_answer(
    wworks_desc: Path, 
    markers: list[str]
):
    if not wworks_desc.exists():
        raise FileNotFoundError(f"File {wworks_desc} does not exist")

    # TODO: look for matching constants in constants.py (e.g. date)

    with open(wworks_desc, "r") as f:
        job_metadata = f.read()

    job_metadata = job_metadata.split("\n")

    data = {field: None for field in markers}

    for line in job_metadata:
        for field in markers:
            if field.lower() in line.lower():
                data[field] = line.split(":")[1].strip()

    return data