FROM node:20-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine as production
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/public ./public
COPY --from=build /app/run.sh .
COPY --from=build /app/src/db ./src/db
COPY --from=build /app/src/lib/supabase ./src/lib/supabase
RUN npm ci
EXPOSE 3000
CMD ["sh", "run.sh"]