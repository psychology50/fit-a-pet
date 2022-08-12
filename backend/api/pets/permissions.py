from rest_framework.permissions import BasePermission
from pets.models import Pet, Member

class MemberPermission(BasePermission):
    def has_permission(self, request, view):
        pet_id = view.kwargs['pk']
        user = request.user

        if request.method == 'delete':
            master = Pet.objects.get(pet_id=pet_id).master.user_id
            return True if user.user_id == master else False
        else:
            member = user.member_set.all().values_list('pet_id__pet_id', flat=True)
            return True if pet_id in member else False

