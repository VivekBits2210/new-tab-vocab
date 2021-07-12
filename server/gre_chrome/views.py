from django.http import HttpResponse


def index(request):
    params = ["param1", "param2"]
    api_param_dict = {}
    for param in params:
        api_param_dict[param] = request.GET[param]
    print(api_param_dict)
    return HttpResponse(f"Hello world: {[api_param_dict[param] for param in params]}")
