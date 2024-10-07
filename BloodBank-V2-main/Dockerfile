# Bước 1: Sử dụng image Node.js làm môi trường xây dựng
FROM node:20 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Bước 2: Sử dụng một image nhẹ hơn để chạy ứng dụng
FROM nginx:alpine

# Sao chép các file đã xây dựng từ bước trước vào thư mục của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]