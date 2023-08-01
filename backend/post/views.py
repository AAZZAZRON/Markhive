import json
from django.http import JsonResponse
from ..models import CustomUser
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

@csrf_exempt
@require_http_methods(['POST'])
@permission_classes([AllowAny])
def signup(request):
    message = {'message': 'Request method not allowed', 'success': False}
    if request.method == 'POST':
        data = json.loads(request.body)

        username = data['username']
        first_name = data['first-name']
        last_name = data['last-name']
        email = data['email-address']
        password = data['password']
        password2 = data['confirm-password']

        if (not password) or password != password2: # validate password
            message['message'] = 'Passwords do not match'
            return JsonResponse(message)
        if not username: # validate username
            message['message'] = 'Username is required'
            return JsonResponse(message)
        if CustomUser.objects.filter(username=username).exists():
            message['message'] = 'An account with this username already exists'
            return JsonResponse(message)
        if not email: # validate email
            message['message'] = 'Email is required'
            return JsonResponse(message)
        if CustomUser.objects.filter(email=email).exists():
            message['message'] = 'An account with this email already exists'
            return JsonResponse(message)
        
        # valid data
        user = CustomUser.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
        user.save()
        message['message'] = 'Account created successfully'
        message['success'] = True
    return JsonResponse(message)

