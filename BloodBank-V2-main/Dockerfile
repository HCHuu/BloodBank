# Bước 1: Chọn image cơ sở cho quá trình build
FROM node:20 AS build

# Bước 2: Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Bước 3: Sao chép package.json và package-lock.json
COPY package*.json ./

# Bước 4: Cài đặt các phụ thuộc
RUN npm install

# Bước 5: Sao chép toàn bộ mã nguồn vào container
COPY . .

# Bước 6: Biên dịch ứng dụng
RUN npm run build  # Tạo thư mục dist

# Bước 7: Tạo image cho runtime
FROM node:20 AS runtime
WORKDIR /usr/src/app

# Bước 8: Sao chép thư mục dist từ giai đoạn build
COPY --from=build /usr/src/app/dist ./dist

# Bước 9: Sao chép package.json và package-lock.json để cài đặt phụ thuộc cần thiết
COPY --from=build /usr/src/app/package*.json ./

# Bước 10: Cài đặt các phụ thuộc cần thiết cho môi trường production
RUN npm install --only=production

# Bước 11: Mở cổng và chạy ứng dụng
EXPOSE 3000
CMD ["node", "dist/index.js"]  # Thay đổi nếu file chính khác