# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ConsultCafeApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='resto',
            name='kitchen',
            field=models.CharField(default='Europe', max_length=50),
            preserve_default=False,
        ),
    ]
