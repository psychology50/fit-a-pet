from pets.models import Pet


def resetMeal():
    Pet.objects.all().update(morning=False)
    Pet.objects.all().update(lunch=False)
    Pet.objects.all().update(dinner=False)
