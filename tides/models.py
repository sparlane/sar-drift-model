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

    def as_object(self):
        """
        Return an object representing this tide location
        """
        return {
            'id': self.pk,
            'name': self.name,
            'description': self.description,
            'location': {
                'latitude': self.location.y,   # pylint: disable=E1101
                'longitude': self.location.x   # pylint: disable=E1101
            }
        }


class TideData(models.Model):
    """
    Data for a specific high or low tide
    """
    location = models.ForeignKey(TideLocation, on_delete=models.CASCADE)
    high = models.BooleanField()
    height = models.DecimalField(decimal_places=3, max_digits=6)
    occurs = models.DateTimeField()

    def as_object(self):
        """
        Return an object representing this tide data
        """
        return {
            'id': self.pk,
            'high': self.high,
            'height': self.height,
            'occurs': self.occurs
        }

    class Meta:
        """
        Setup the indexes
        """
        # pylint: disable=R0903
        indexes = [
            models.Index(fields=['location', 'occurs']),
        ]
