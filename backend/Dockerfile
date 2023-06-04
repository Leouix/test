FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql exif pcntl bcmath gd

# Get latest Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Создаём пользователя и группу www для приложения Laravel
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Копируем содержимое текущего каталога в рабочую директорию
COPY . /app/backend
RUN chown -R www:www . /app/backend

# Меняем пользователя на www
USER www
WORKDIR /app/backend

RUN composer install


EXPOSE 9000
# CMD php artisan migrate
# CMD php artisan serve --host=0.0.0.0 --port=9000
CMD ["php-fpm"]
# CMD ["php artisan migrate"]
# CMD php artisan migrate

# ENTRYPOINT ["./init.sh"]
