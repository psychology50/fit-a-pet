from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers
from .views import *

app_name = 'pets'

router = SimpleRouter()
router.register('', PetViewSet)

"""
cycle_router = routers.NestedSimpleRouter(router, r'pets', lookup='pet')
cycle_router.register(r'cycles', CycleViewSet, basename = "pet-cycle")

event_router = routers.NestedSimpleRouter(router, r'pets', lookup='pet')
event_router.register(r'events', EventViewSet, basename = "pet-events")

prescription_router = routers.NestedSimpleRouter(router, r'pets', lookup='pet')
prescription_router.register(r'prescriptions', PrescriptionViewSet, basename = "pet-prescriptions")

active_router = routers.NestedSimpleRouter(router, r'pets', lookup='pet')
active_router.register(r'actives', ActiveImgViewSet, basename = "pet-actives")
"""

urlpatterns = [
    path('', include(router.urls)),
    # path('', include(cycle_router.urls)),
    # path('', include(event_router.urls)),
    # path('', include(prescription_router)),
    # path('', include(active_router))
    
    # events
    path('events/', EventCreateView.as_view(), name='event-create'),
    path('events/<int:pk>/', EventUpdateView.as_view(), name='event-update')
]