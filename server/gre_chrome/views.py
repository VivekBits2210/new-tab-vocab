from django.http import JsonResponse
import pickle
import random


def index(request):
    params = ["param1", "param2"]
    api_param_dict = {}
    for param in params:
        api_param_dict[param] = request.GET[param]
    print(api_param_dict)
    return JsonResponse(
        {"message": f"Hello world: {[api_param_dict[param] for param in params]}"},
    )


def fetch_word(request):
    datapoint = random.choice(
        pickle.load(open("./gre_chrome/all_words_with_freq_and_meaning.pkl", "rb"))
    )
    datapoint["word"] = datapoint["word"].capitalize()
    return JsonResponse(datapoint)
