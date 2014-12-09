# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ConsultCafeApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='personlocation',
            name='username',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='resto',
            name='type',
            field=models.CharField(max_length=50),
        ),
    ]
