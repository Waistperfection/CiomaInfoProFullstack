from typing import Callable
from django.core.files import File
import pandas as pd
from pandas import DataFrame

from .exceptions import FileError, FileFormatError, FileSizeError


def parse_dataframe(data: DataFrame) -> dict:
    """Prepare data to be sent to frontend

    Args:
        data (DataFrame): pandas dataframe

    Returns:
        dict: returns data separated as 
        {"columns": list[str], "data": list[list[Any]]}
    """
    data = data.replace({float("nan"): None})
    return data.to_dict(orient="split", index=False)


def parse_csv(file: File) -> dict:
    try:
        dataframe = pd.read_csv(file.file)
    except pd.errors.ParserError:
        raise FileError("Unprocessable file")
    return parse_dataframe(dataframe)


def parxe_xlsx(file: File) -> dict:
    try:
        dataframe = pd.read_excel(file.file)
    except pd.errors.ParserError:
        raise FileError("Unprocessable file")
    return parse_dataframe(dataframe)


PARSER_MAPPING: dict[str, Callable[[File], dict]] = {
    "csv": parse_csv,
    "xlsx": parxe_xlsx,
}

MAX_FILE_SIZE = 1 * 1024 * 1024


def check_file_format(file: File):
    """Check the file format can be mapped with PARSER_MAPPING

    Args:
        file (File): Django's file object

    Raises:
        FileFormatError: raises when file format can't be mapped with PARESR_MAPPING
    """
    file_format = file.name.split(".")[-1]
    if file_format not in PARSER_MAPPING:
        raise FileFormatError("Unexpected file format")
    return


def check_file_size(file: File):
    """Check the file size is less than MAX_FILE_SIZE

    Args:
        file (File): Django's file object
    Raises:
        FileSizeErorr: raises when file size is greater than MAX_FILE_SIZE
    """
    if file.size > MAX_FILE_SIZE:
        raise FileSizeError("File too large")


def get_file_parser(file: File) -> Callable[[File], dict]:
    """Mapper to get correct file parser

    Args:
        file (File): Django's file object

    Raises:
        FileFormatError: raises when file format not in PARSER_MAPPING

    Returns:
        Callable[[File], dict]: return the correct file parser
    """
    file_format = file.name.split(".")[-1]
    parser = PARSER_MAPPING.get(file_format)
    if parser is None:
        raise FileFormatError("Unexpected file format")
    return parser
