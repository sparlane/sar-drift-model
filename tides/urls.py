"""
URLs for tidal information
"""

from django.urls import re_path

from . import views

urlpatterns = [
    re_path(r'^tides/$', views.TideLocationsView.as_view(), name='locations_data'),
    re_path(r'^tides/(?P<location_id>\d+)/$', views.TideDataView.as_view(), name='location_tide_data'),
]
