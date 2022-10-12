import { App } from '@deepkit/app'
import { Logger } from '@deepkit/logger'
import { FrameworkModule } from '@deepkit/framework'
import { http, HttpBody, HttpQueries } from '@deepkit/http'

class MyPage {
  constructor(protected logger: Logger) {
    logger.log('init!')
  }

  // curl 127.0.0.1:8080/get/543\?a=asdfg
  @http.GET('/get/:d')
  async getExample(d: number, q: HttpQueries<{ a?: string }>) {
    this.logger.log('something')
    return { res: 'Hello World!', d, q }
  }

  // curl -X POST -H "Content-Type: application/json" 127.0.0.1:8080/post -d '{"arg": 123}'
  @http.POST('/post')
  async postExample(body: HttpBody<{ arg: number }>) {
    return { res: 'Hello World!', arg: body.arg }
  }
}

const main = async () => {
  const app = new App({
    controllers: [MyPage],
    providers: [],
    imports: [new FrameworkModule({ debug: false })],
  })
  await app.run()
}

main()
