from pathlib import Path
from datetime import datetime
from dataclasses import dataclass


@dataclass
class JobData:
    company_name: str
    job_title: str
    application_deadline: datetime


markers = [
    "Job Title",
    "Region",
    "Start Date"
    "Application Deadline"
    "Application Documents Required"
]


# def determine_answer(wworks_desc: str, markers: list[str]):
def determine_answer(wworks_desc: str) -> JobData:
    job_metadata = wworks_desc.split("\n")
    # data = {field: None for field in markers}

    # for line in job_metadata:
    #   for field in markers:
    #     if field.lower() in line.lower():
    #       data[field] = line.split(":")[1].strip()

    # return data


if __name__ == "__main__":
    with open("wworks_page.txt", "r") as f:
        wworks_desc = f.read()
    markers = determine_answer(wworks_desc)
