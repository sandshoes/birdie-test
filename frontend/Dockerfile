FROM node:18-alpine AS base
WORKDIR /usr/src/frontend
COPY package*.json ./

FROM base AS dependencies  
RUN apk add --no-cache python3 make g++ && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache
ENV PYTHON=/usr/bin/python3
RUN npm install

FROM dependencies AS build  
COPY . ./
RUN npm run build

FROM nginx:1.21-alpine AS release  
COPY --from=build /usr/src/frontend/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
