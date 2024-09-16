from django.http import HttpRequest
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.core.files import File
from django.http.response import HttpResponseBadRequest, JsonResponse

from .forms import FileUploadForm
from .exceptions import BaseServiceError
from .service import check_file_format, check_file_size, get_file_parser


@csrf_exempt
@require_POST
def file_handler(request: HttpRequest) -> JsonResponse:
    form = FileUploadForm(data=request.POST, files=request.FILES)

    if not form.is_valid():
        return JsonResponse({"error": "Invalid form"}, status=400)
    file: File = form.files["file"]
    try:
        check_file_size(file)
        check_file_format(file)
    except BaseServiceError as e:
        return JsonResponse({"error": str(e)}, status=400)
    parser = get_file_parser(file)
    table_data = parser(file)

    return JsonResponse(table_data, json_dumps_params={"ensure_ascii": False})
