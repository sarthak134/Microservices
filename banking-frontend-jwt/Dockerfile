FROM nginx:alpine

# Remove the default Nginx web content
RUN rm -rf /usr/share/nginx/html/*

# Copy only the generated production files
COPY dist/ /usr/share/nginx/html/

# Install the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the HTTP port
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]