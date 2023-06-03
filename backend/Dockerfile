FROM php:8.1-fpm

USER root

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql exif pcntl bcmath gd

# Get latest Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Создаём пользователя и группу www для приложения Laravel
RUN groupadd -g 1001 www-x
RUN useradd -u 1001 -ms /bin/bash -g www-x www-x

# Копируем содержимое текущего каталога в рабочую директорию
COPY . /var/www/app/backend
RUN chown -R www-x:www-x . /var/www/app/backend

# Меняем пользователя на www
USER www-x
WORKDIR /var/www/app/backend

# ENTRYPOINT ["./init.sh"]

# В контейнере открываем 9000 порт и запускаем сервер php-fpm
EXPOSE 9000
CMD ["php-fpm"]
