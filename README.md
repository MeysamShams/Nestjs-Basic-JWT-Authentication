<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <h2 align="center">Basic jwt authentication using passport and nestjs guards.</h2>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Installation

```bash
$ npm install
```
## How to use?
Import the AuthModule in your module :
```ts
import { AuthModule } from 'src/auth/auth.module';
...
@Module({
  controllers: [...],
  providers: [...],
  imports:[AuthModule,...]
})
export class MyModule {}
```
Use the AuthGuard in your controller as controller-scoped, method-scoped or use it in the ``main.ts`` file as global-scoped guard  :<br/>

**1. Controller-scoped :**
```ts
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
...
@UseGuards(AuthGuard())
@Controller()
export class MyController {
    constructor(){}
    ...
}
    
```
**2. Method-scoped :**
```ts
import { UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
...
@Controller()
export class MyController {
    constructor(){}
    ...
    
    @UseGuards(AuthGuard())
    @Get()
    findAll(){
    ...
    }
}
    
```
**3. Global-scoped (in the ``main.ts`` file) :**
```ts
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(AuthGuard());
```
## Running the app

```bash
$ npm run start
```
