from ConsultCafe.models import Resto

def add(requset):
	resto = Resto(
			name="Woodrock"
			type="Pub"
		)
	print 'YoHo!'
	resto.save()