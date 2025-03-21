"""
Models for tides
"""
from django.contrib.gis.db import models


class TideLocation(models.Model):
    """
    A reference tide location
    """
    name = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    location = models.PointField(geography=True)


class TideData(models.Model):
    """
    Data for a specific high or low tide
    """
    location = models.ForeignKey(TideLocation, on_delete=models.CASCADE)
    high = models.BooleanField()
    height = models.DecimalField(decimal_places=3, max_digits=6)
    timestamp = models.DateTimeField()

    class Meta:
        """
        Setup the indexes
        """
        # pylint: disable=R0903
        indexes = [
            models.Index(fields=['location', 'timestamp']),
        ]
