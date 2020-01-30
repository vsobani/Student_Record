from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import StudentSerializer,StudentCreateSerializer
from rest_framework.decorators import api_view
from .models import *
from rest_framework import generics



class StudentView(viewsets.ModelViewSet):

    serializer_class = StudentSerializer
    queryset = Student.objects.all()



@api_view(['GET',])
def api_student_list_view(request):
    student = Student.objects.all()
    if request.method == 'GET':
        serializer = StudentSerializer(student, many=True)
        return Response(serializer.data)

# @api_view(['GET',])
# def api_student_id_list_view(request, id):
#     try:
#         student = Student.objects.get(id=id)
#     except Student.DoesNotExist:
#         return Response(status.HTTP_404_NOT_FOUND)
#     else:
#         if request.method == 'GET':
#             serializer = StudentSerilizer(student)
#             return Response(serializer.data)
      

@api_view(['POST',])
def api_create_student_view(request):
    if request.method == 'POST':
        serializer = StudentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = {}
            data['Success'] = 'Student data Created Successfully'
            return Response(data=data)
        return Response(serializer.errors, status.HTTP_404_NOT_FOUND)


@api_view(['DELETE',])
def api_delete_student_view(request,id):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response(status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        data = {}
        operation = student.delete()
        if operation:
            data['Success'] = 'Delete operation completed successfully'
        else:
            data["Failure"] = "Delete Failed"
        return Response(data=data, status=status.HTTP_200_OK)
    return Response(status.HTTP_405_METHOD_NOT_ALLOWED)
