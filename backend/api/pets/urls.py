from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers
from .views import *

app_name = 'pets'

router = SimpleRouter()
router.register('', PetViewSet)

cycle_router = routers.NestedSimpleRouter(router, r'', lookup='pet')
cycle_router.register(r'cycles', CycleViewSet, basename = "pet-cycle")

"""
event_router = routers.NestedSimpleRouter(router, r'', lookup='pet')
event_router.register(r'events', EventViewSet, basename = "pet-events")

prescription_router = routers.NestedSimpleRouter(router, r'', lookup='pet')
prescription_router.register(r'prescriptions', PrescriptionViewSet, basename = "pet-prescriptions")

active_router = routers.NestedSimpleRouter(router, r'', lookup='pet')
active_router.register(r'actives', ActiveImgViewSet, basename = "pet-actives")
"""

urlpatterns = [
    path('', include(router.urls)),
    path('', include(cycle_router.urls)),
    # path('', include(event_router.urls)),
    # path('', include(prescription_router)),
    # path('', include(active_router))
    
    # events
    path('<int:pk>/events/', EventCreateView.as_view(), name='event-create'),
    path('<int:pk>/events/<int:event_pk>/', EventUpdateView.as_view(), name='event-update'),
    path('<int:pk>/events/list/', EventListView.as_view(), name='event-list'),
    path('<int:pk>/events/<int:event_pk>/delete/', EventDeleteView.as_view(), name='event-delete'),
    path('<int:pk>/events/<int:event_pk>/complete/', EventCompleteView.as_view(), name='event-complete'),

    # prescriptions
    path('<int:pk>/prescriptions/', PrescriptionCreateView.as_view(), name='prescription-create'),
    path('<int:pk>/prescriptions/<int:prescription_pk>/', PrescriptionUpdateView.as_view(), name='prescription-update'),
    path('<int:pk>/prescriptions/list/', PrescriptionListView.as_view(), name='prescription-list'),
    path('<int:pk>/prescriptions/<int:prescription_pk>/delete/', PrescriptionDeleteView.as_view(), name='prescription-delete'),

    # ActiveImages
    path('<int:pk>/ActiveImages/', ActiveImageCreateView.as_view(), name='ActiveImage-create'),
    path('<int:pk>/ActiveImages/list/', ActiveImageListView.as_view(), name='ActiveImage-list'),
    path('<int:pk>/ActiveImages/<int:image_id>/', ActiveImageRetrieveView.as_view(), name='ActiveImage-retrieve'),
    path('<int:pk>/ActiveImages/<int:image_id>/update/', ActiveImageUpdateView.as_view(), name='ActiveImage-update'),
    path('<int:pk>/ActiveImages/<int:image_id>/delete/', ActiveImageDeleteView.as_view(), name='ActiveImage-delete'),
]