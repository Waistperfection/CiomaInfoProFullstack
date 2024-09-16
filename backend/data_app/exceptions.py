class BaseServiceError(Exception):
    pass


class FileFormatError(BaseServiceError):
    pass


class FileSizeError(BaseServiceError):
    pass


class FileError(BaseServiceError):
    pass