````markdown
# Lucia Next Prisma Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
````

Next, copy the

.env.example

file to

.env

:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in the

.env

file to match your database configuration. For example:

- **SQLite**:

  ```env
  DATABASE_URL="file:./dev.db"
  ```

- **PostgreSQL**:

  ```env
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
  ```

- **MySQL**:

  ```env
  DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
  ```

- **MongoDB**:
  ```env
  DATABASE_URL="mongodb+srv://USER:PASSWORD@HOST/DATABASE"
  ```

Update the `provider` in the

schema.prisma

file to match your database configuration. For example:

- **SQLite**:

  ```prisma
  datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL")
  }
  ```

- **PostgreSQL**:

  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```

- **MySQL**:

  ```prisma
  datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
  }
  ```

- **MongoDB**:
  ```prisma
  datasource db {
    provider = "mongodb"
    url      = env("DATABASE_URL")
  }
  ```

Next, create the Prisma database by running the following command:

```bash
npx prisma migrate dev
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying [`app/page.tsx`](app/page.tsx). The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Routes

### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Input**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Output**:
  - **Success**:
    ```json
    {
      "message": "Login successful",
      "user": {
        "id": "user_id",
        "email": "user@example.com"
      }
    }
    ```
  - **Failure**:
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

### Logout

- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Input**: None
- **Output**:
  - **Success**:
    ```json
    {
      "message": "Logout successful"
    }
    ```
  - **Failure**:
    ```json
    {
      "error": "Logout failed"
    }
    ```

### New User

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Input**:
  ```json
  {
    "email": "newuser@example.com",
    "password": "password123"
  }
  ```
- **Output**:
  - **Success**:
    ```json
    {
      "message": "User created successfully",
      "user": {
        "id": "new_user_id",
        "email": "newuser@example.com"
      }
    }
    ```
  - **Failure**:
    ```json
    {
      "error": "User creation failed"
    }
    ```

## Middleware

The middleware checks if the user is authenticated before accessing protected routes. If the user is not authenticated, they are redirected to the login page.

```typescript
const { url } = request;
const path = new URL(url).pathname;

if (protectedRoutes.some((route) => path.startsWith(route))) {
  const session = request.cookies.get("session");
  if (!session) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }
  validateSessionToken(session.value)
    .then((result) => {
      if (!result.user) {
        return NextResponse.redirect(new URL(loginUrl, request.url));
      }
      return NextResponse.next();
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.redirect(new URL(loginUrl, request.url));
    });
}
return NextResponse.next();
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Lucia Documentation

This project was inspired by the Lucia authentication library. You can learn more about Lucia by visiting the [Lucia Documentation](https://lucia-auth.vercel.app/).

## License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for details.

```

This updated `README.md` includes information on how to copy the `.env.example` file to `.env`, how to change the database URL to different databases, and how to update the Prisma schema file accordingly.
This updated `README.md` includes information on how to copy the `.env.example` file to `.env`, how to change the database URL to different databases, and how to update the Prisma schema file accordingly.

Similar code found with 2 license types
```
