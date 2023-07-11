# LLKC-Farm-Animals
[![Dynamic XML Badge](https://img.shields.io/badge/dynamic/xml?url=https%3A%2F%2Fraw.githubusercontent.com%2FCerbenix%2FLLKC_Farm_Animals%2Fmaster%2Fcoverage-report%2Findex.html&query=%2F%2Ftr%5B1%5D%2Ftd%5B%40class%3D'warning%20big'%5D%5B1%5D%2Fdiv%5B%40class%3D'progress'%5D%5B1%5D%2Fdiv%5B%40class%3D'progress-bar%20bg-warning'%5D%5B1%5D%2F%40aria-valuenow&suffix=%25&label=Coverage)](https://raw.githack.com/Cerbenix/LLKC_Farm_Animals/master/coverage-report/index.html)

## Description

LLKC test assignment - Farm Animals

Laravel 8 backend api

React frontend with Tailwind CSS and Boostrap

Features included:

1. Registration and login forms with validation on frontend and backend
2. Authentication and authorization with Laravel sanctum
3. CRUD functionality for farms and animals adhering to the task conditions
4. Implemented laravels migration, factory and seeder functionality
5. Used pagination for farm and animal lists

## Project Setup

#### Install
``composer install``

``cd .\frontend\``

``npm install``

#### Setup .env file

``cp .env.example .env``

You will need to setup the database connection.

``php artisan key:generate``

#### Create database

``php artisan migrate``

``php artisan db:seed``

#### Run project locally

Run backend

``php artisan serv``

Run frontend

`` cd .\frontend\ ``

``npm run dev``

## Take a look
### Register page
![image](https://github.com/Cerbenix/LLKC_Farm_Animals/assets/124684938/c6a72cc3-a278-4dcc-8656-06971d3d9e47)

### My Farms page
![image](https://github.com/Cerbenix/LLKC_Farm_Animals/assets/124684938/1476683d-115f-4ebc-87b2-2e0c2d3a3716)

### Single Farm page
![image](https://github.com/Cerbenix/LLKC_Farm_Animals/assets/124684938/acf0447c-612d-4a67-824c-f12f7f2901f8)

### My animals page
![image](https://github.com/Cerbenix/LLKC_Farm_Animals/assets/124684938/a6b4ed89-b505-46c1-b694-177ba29b2a04)




