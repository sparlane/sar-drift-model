"""
Views for tides
"""
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views import View

from .models import TideData, TideLocation


class TideDataView(View):
    """
    Show/Import tidal data for a specific port/location
    """
    def as_json(self, location):
        """
        Return the tide data from start to end
        """
        tides = TideData.objects.filter(location=location).order_by('occurs')
        return JsonResponse({
            'location': location.as_object(),
            'tides': [tide.as_object() for tide in tides]
        })

    def get(self, request, location_id):
        """
        Get a human-readable view of tidal data
        """
        location = get_object_or_404(TideLocation, pk=location_id)
        if "application/json" in request.META.get('HTTP_ACCEPT', ''):
            return self.as_json(location)
        return render(request, 'tides/tide_location.html')


class TideLocationsView(View):
    """
    Show/Add Tide Locations
    """
    def as_json(self):
        """
        Return the full list of locations
        """
        locations = TideLocation.objects.all()
        data = {
            'locations': [loc.as_object() for loc in locations],
        }
        return JsonResponse(data)

    def get(self, request):
        """
        Get a human-readable list of tidal locations
        """
        if "application/json" in request.META.get('HTTP_ACCEPT', ''):
            return self.as_json()
        return render(request, 'tides/location_list.html')
