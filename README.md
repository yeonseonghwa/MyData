# 블록체인을 이용한 웹 사이트 이용기록 관리 시스템
## 1. 연구 배경과 목적

  오늘날 빅데이터와 AI의 인기에 힘입어 마이 데이터에 대한 관심 또한 대두되고 있다. 마이 데이터란 단어의 뜻 그대로 나의 데이터를 총칭하는 말이기도 하지만, 정보 사용 및 제공의 주체를 데이터 생성자에게 둔다는 점에서 데이터를 넘어 데이터의 주권을 담고 있다. 하지만 실제 많은 개인 맞춤형 서비스나 빅데이터를 이용한 서비스들은 데이터 주권을 무시한 채 무분별하게 수집하여 마이 데이터를 사용하고 있다. 특히 웹 검색엔진과 그들이 제공하는 광고 서비스는 대부분 사용자의 정보를 가지고 있으며 사용자의 행위를 수집해 맞춤 서비스를 제공한다. 이 과정에서 사용자는 자신의 데이터가 어떻게 수집되고 사용되는지 알 수 없지만 결과적으로 서비스 제공자에게 이익이 돌아가게 된다. 이러한 문제점을 해결하기 위해서 사용자가 자신의 데이터 흐름을 관리하거나 확인할 수 있어야 하며 제 3자가 자신의 데이터를 사용할 경우 본인의 확인과 데이터 제공에 대한 보상을 받는 환경이 구축되야한다. 기존의 웹 검색엔진은 사용자 데이터의 주권을 침해하는 것 말고도 트래픽에 관한 문제점이 있다. 검색엔진은 사용자에게 검색서비스를 제공하기 위해 봇과 웹 크롤러 등의 자동화 프로그램을 사용해 수많은 웹 트래픽을 발생시키고 있으며 이는 전체 웹 트래픽의 절반 정도를 차지하고 있다. 이렇게 발생하는 트래픽은 여러가지 피해를 유발한다. 특히 자원이 한정되어 있는 저 사양 서버에서는 불필요한 자원 소모를 발생시키면 서버가 마비되어 서비스를 중단되는 등의 심각한 피해를 끼친다. 때문에 불필요한 트래픽의 발생을 개선할 방법에 대한 연구가 필요하다.
  
  본 연구는 데이터 주권 침해와 검색엔진의 트래픽 문제점을 해결하기 위해 블록체인의 Smart Contract를 활용하는 시스템을 구축한다. 또한 활용 방법으로 기록된 정보를 바탕으로 구축된 웹 사이트 검색엔진을 제시한다. 블록체인을 사용해 사용자의 웹 사이트 방문기록을 저장하게 되면 데이터의 변조를 방지할 수 있는 시스템을 제공할 수 있으며, Smart Contract를 통해 제공자와 사용자 사이의 비용지불 등의 처리를 자동화해 효율성을 늘릴 수 있다. 이렇게 저장된 정보로 웹 사이트 검색엔진을 구축해 불필요한 자동화 프로그램의 사용을 줄여 더 나은 웹 생태계를 만들 수 있다.
  
## 2. 블록체인을 이용한 웹사이트 이용기록 관리 시스템
### 1. Proxy를 이용한 Mydata 수집
*(그림)Server의 동작 과정*
![server의 동작과정](https://user-images.githubusercontent.com/34391309/108671287-87591700-7523-11eb-9e6f-8fc0efe3550c.png)


Mydata 수집을 위해 Proxy 서버를 이용한다. 먼저 Proxy 서버는 BlockChain 네트워크에 transaction 전송을 할 수 있는 환경이 구축되어야 하며, 수집된 정보를 저장하는 Smart Contract를 미리 작성해야한다. 이를 통하여 수집된 웹사이트 이용기록을 BlockChain에 기록할 수 있게 된다. Proxy Server는 Node.js와 unblocker module을 사용하여 구현된다. unblocker 모듈은 node.js를 사용한 프록시 서버의 구축과 script 삽입을 위해 사용된다. 

*(그림)Client의 Proxy Site를 이용한 접속*
![image00019](https://user-images.githubusercontent.com/34391309/108671288-87f1ad80-7523-11eb-841a-d1bebd4517a3.png)

먼저 USER는 Proxy Server를 통해 목적지 서버에 접속하게 된다. 이때 별도의 프로그램 설치는 필요 없다.

Proxy_Server는 USER의 요청에 따라 목적지 서버에 요청을 전송하고 응답을 받는다. 이때 웹사이트 이용기록 수집과 Proxy Service를 위한 JavaScript를 삽입하고 USER에 응답을 전달한다.

USER는 받은 응답을 기반으로 웹서핑을 이어가게 되며 이때 JavaScript는 USER가 Proxy Site를 통해 접속하는 url을 수집한다.

*(그림)Client에서 GET방식을 이용해 Proxy Server로 데이터를 전송*
![image00020](https://user-images.githubusercontent.com/34391309/108671290-888a4400-7523-11eb-8cdc-c461c89c1ce9.png)



JavaScript가 수집한 url은 다시 Proxy Server에 GET방식으로 전달된다. 이를 전달받은 Proxy Server는 Node.js와 Eos.js을 활용하여 Transaction을 BlockChain에 전송한다.

*(그림)Proxy Server에서 전송한 Transaction을 블록체인 노드 웹서버가 승인한 모습*
![image00021](https://user-images.githubusercontent.com/34391309/108671294-888a4400-7523-11eb-91c0-c3b6c5819ab7.png)

BlockChain 네트워크에 전송된 Transaction은 웹사이트 이용기록하기 위한 Smart Contrat를 실행하고 Smart Contract는 이를 Chain과 multi index 데이터베이스인 EOSIO::TABLE에 기록한다.

### 2. Smart Contract를 이용한 Mydata 기록
Smart Contract를 이용한 Mydata기록을 위해서는 먼저 Contract작성을 필요로 한다. EOS에서는 Contart 작성시 C++을 사용하고 있으며 이를 컴파일하여 웹 어셈블리로 변환하고 블록체인 네트워크에 업로드 함으로써 Contrat를 이용할 수 있다. 본 시스템에서는 EOSIO.CDT (Contract Development Toolkit)의 1.6.x버전을 기준으로 작성되었다.

*(그림) 작성된 table의 일부분*

![image00022](https://user-images.githubusercontent.com/34391309/108671296-8922da80-7523-11eb-86e0-c9b52adbb2d4.jpg)

EOS의 Contract는 크게 eosio::contract, eosio::action, eosio::table로 구성되어 있다. 본 시스템에서는 eosio::table에 transaction을 전송한 지갑이름, 전송시간, 사이트의 Title, 사이트의 웹주소 등을 기록하도록 작성되었다. 

*(그림) 작성된 action의 일부분*
![image00023](https://user-images.githubusercontent.com/34391309/108671266-832cf980-7523-11eb-9eb8-8c12147c602b.jpg)

eosio::action에는 정보 전송을 위한 action을 작성하였다. 이 action에는 transaction 전송자와 기록의 소유자가 동일한지 지갑 정보를 이용하여 검증하고 먼저 작성된 table의 repository를 검색 하여 해당 인덱스 자리에 데이터가 없다면 emplace 함수를 이용하여 기록하도록 한다.

구현된 contract를 eosio-cpp를 이용하여 compile하고 cleos를 이용하여 contract를 등록한다. 이는 transaction을 이용하여 blockchain에 등록되어있는 contract를 사용할 수 있게된다.

Proxy 서버가 구현된 코드에 유저의 방문 url을 수집하여 서버로 전송하는 스크립트를 작성하여 삽입하는 코드를 작성한다. 수집된 url은 작성된 contract의 table형식과 같도록 가공하여 eos.js를 이용해 transaction전송한다. 

*(그림) Proxy Server에서 전송한 Transaction이 작동한 모습*
![image00024](https://user-images.githubusercontent.com/34391309/108671269-83c59000-7523-11eb-8ed3-7c30099b7f90.png)

eos.js가 Blockchain network에 transaction을 전송하면 contract가 작동되게 되고 eosio::table에 기록되게 되며 이는 block에 transaction기록으로 남게된다.

*(그림) 블록에 담긴 트랜잭션 내용의 예*
![image00025](https://user-images.githubusercontent.com/34391309/108671272-845e2680-7523-11eb-833e-8a29a2c4adc2.jpg)

### 3. Block Chain에 저장된 MyData의 활용

*(그림) 블록체인 기록의 전달과 역할*
![image00026](https://user-images.githubusercontent.com/34391309/108671274-84f6bd00-7523-11eb-9f0e-b51e60e107f0.png)

블록체인 네트워크로 전송된 기록 즉 블록에 저장된 기록은 가공이 쉽지 않다. 따라서 활용을 위해 데이터베이스와 연동된다. 이때 EOS에서 제공하는 MongoDB와 연동하는 Api를 사용하여 둘을 연동한다. 그리고 웹 검색엔진 서비스를 제공하기 위해서  mongo-connector를 이용하여 MongoDB와 ElasticSearch를 연동한다. 

*(그림) 전송된 데이터가 검색엔진에 반영된 모습*
![image00027](https://user-images.githubusercontent.com/34391309/108671278-858f5380-7523-11eb-988c-dfbf7f58e228.png)

데이터베이스에 연동된 정보를 가공하여 검색엔진에 전송하고 이를 활용하여 블록체인과 마이 데이터를 활용한 검색엔진을 구축하며 이 검색엔진은 사용자에게 직접 사이트에 대한 피드백을 받아 기록하고 이를 활용하여 사이트에 대한 선호도를 측정하고 이를 활용하여 검색 결과 표시시에 표시 순서를 정하거나 관련 웹페이지를 추천하는데 사용된다. 현 시스템에서는 방문 횟수를 바탕으로 하여 순위를 지정한다.

*(그림) 서비스 이용을 통해 검색엔진의 데이터가 증가하는 모습*
![image00028](https://user-images.githubusercontent.com/34391309/108671280-858f5380-7523-11eb-9b45-36d74c251713.png)

검색 엔진은 데이터베이스에 저장된 정보의 양이 많을수록 더 많고 정확한 정보를 사용자에게 표시할 수 있으며 데이터베이스는 블록에 기록된 데이터의 양이 많을수록 정보가 증가한다. 블록체인은 Smart Contract를 위한 transaction의 전송이 많을수록 블록에 많은 정보가 저장되며, 이는 사용자의 웹 기록이 많이 발생할수록 증가한다.

따라서 이용자들이 많을수록, 해당 서비스를 이용한 웹 기록이 많아질 수록 transaction이 많이 발생하게 되고 그 결과로 본 서비스는 발전하게 된다. 또한 실제 웹 서핑 활동의 데이터가 현재 검색 엔진 사이트들의 봇과 크롤러 보다 효율적이고 의미 있는 링크를 클릭하기 때문에 보다 의미 있는 데이터를 바탕으로 검색엔진을 구축한다.


### 4. 시나리오

*(그림) 시나리오*

![image00029](https://user-images.githubusercontent.com/34391309/108671283-8627ea00-7523-11eb-8054-c44581d73cf2.png)

앞서 설명한 수집, 저장 방법과 활용방법으로 제시한 검색엔진의 실제 동작 설명을 위한 그림이다. 전체는 웹사이트 이용기록 시스템의 시나리오를 나타내고 있으며, 그중 상단은 블록체인 기반 검색엔진의 동작을 하단은 저장 방법과 활용 방법의 시나리오를 나타내고 있다. 하단의 수집, 저장 방법을 먼저 보면 사용자가 웹 서핑을 통해 사용기록을 발생시키게 되고 이는 1번 과정을 통해 수집된다. 그리고 수집된 정보는 2번 과정을 통해 블록체인에 기록된다. 따라서 이 과정을 통해 사용자가 프록시 서버를 접속하여 활동하게되면 해당 정보들은 삽입된 Javascript를 통해 사용자 경험을 해치지 않고, 목적지 서버에 사용자의 정보가 유출되는 것을 막으면서 proxy server의 eos.js를 이용한 transaction전송을 통해 스마트 컨트랙트를 실행시킴으로써 블록체인에 저장하게 된다. 그리고 블록체인에 저장된 transaction 기록을 쉽게 활용하기 위해서 데이터베이스와 동기화한다. 이러한 과정을 통해 구축된 데이터베이스를 바탕으로 Search Engine(Server)를 구축한다.

두 번째로 상단은 블록체인 기반 검색엔진의 동작을 나타내고 있으며 사용자는 웹 기반으로 구현된 UI를 통해 블록체인 기반 검색엔진에 쿼리를 전송하여 원하는 정보를 검색할 수 있다. 

*(그림) 블록체인, Proxy, DB, Search Engine Server가 동시 동작하는 모습*
![image00030](https://user-images.githubusercontent.com/34391309/108671284-8627ea00-7523-11eb-8cb9-ef5cdee9890c.jpg)

### 5. 기대효과
본 시스템은 프록시를 이용하여 수집된 정보를 블록체인의 스마트 컨트렉트를 이용하여 블록에 저장하고 데이터베이스와 검색엔진을 이용하는 방법으로 수집된 정보에 대한 활용방안까지 제안하고 있다. 이를 활용한다면 많은 사용자를 바탕으로하여 봇 없는 검색엔진을 구축하여 서비스를 제공하게되고 이는 더 나은 인터넷 환경을 제공하게 될 것이다.

또한 스마트 컨트랙트를 이용한 정보의 기록은 정보의 소유자와 해당 내용이 체인에 정확히 기록되고 투명하게 확인 할 수 있어 요즘 많은 논란이 되고 있는 인터넷 상의 순위 조작과 부정을 확인하고 견제 할 수 있다. 


|지갑 이름|검색 키워드|웹주소(예시)|좋아요|
|------|------|------|------|
|A,C,D|Eos|Eos.io|3|
|A,C|Eos|coinbase|2|
|A|Eos|eoshashnet|1|
|B|Eos|eoswiki|0|

블록체인내 검색할 때 블록체인에 저장된 각 정보들이 표 의 순서로 웹에 표시된다. 사용자가 Eos에 대해 검색을 하면 좋아요 내림차순으로 Eos.io, coinbase, eoshashnet, eoswiki 가 웹에 표시되어 많이 채택되는 문서를 먼저 읽게 된다. 이는 사용자들의 직접적인 행동으로 기록되는 정보이기 때문에 자동으로 수집되는 정보보다 연관이 있을 확률이 높다.

*(그림) 웹기록 수집을 위해 구현된 Proxy Web Site*
![image00032](https://user-images.githubusercontent.com/34391309/108671286-87591700-7523-11eb-8204-5cc5f2278a68.png)

*(그림) 블록내 검색 내용*

![image 000032](https://user-images.githubusercontent.com/34391309/108674833-3c420280-7529-11eb-8f89-a5d8a54f061e.png)

또한 제안하는 검색엔진은 기존 서비스와 달리 자신의 활동 정보를 이용한 블록체인을 기반으로 한 정보 저장관리 시스템이기 때문에 정보의 안전성과 신뢰도가 보장된다.
현재 본 시스템에서는 단일 지갑을 이용하여 시스템을 사용한다는 점과 맞춤형 서비스 제공을 위한 데이터 제공기능, 플랫폼의 한계로 인한 데이터 사용 이력 추적에 대한 기능을 제공하지 않는다는 한계점을 가지고 있다. 이는 맞춤형 서비스와 데이터 사용에 대한 보상을 전달하기 위한 기능으로써 이러한 한계를 보완한다면 더 나은 기대효과를 낼 수 있다. 또한 표시 순서를 정하는데에 있어 단일 지표를 사용해 어뷰징에 취약하다는 한계점이 있지만 지표를 다변화하는 등의 방법을 통해 이를 보완 할 수 있을 것이다.


## 3. 결론
본 논문은 블록체인을 이용하여 사용자의 마이 데이터를 기록하는 시스템과 그를 활용하는 시스템을 제안한다. 이를 통해 정보를 관리하고 정보의 활용에 대한 보상을 합당하게 지불하는 방법과 자동화 프로그램의 불필요한 웹 트래픽을 최소화하는 방법을 서술하고 있다. 이 연구를 통해서 마이 데이터는 보다 더 투명하게 관리되고 그 내용을 사용자가 직접 확인하고 개입할 수 있으며 데이터 주권 의식을 가지게 될 것이다. 이때 주권 의식을 가진 사용자들의 합당한 보상을 요구한다면 필요한 효율적인 방안 또한 제공하여 데이터 주권 의식의 향상에 기여할 것이다. 

활용 방법으로 제시된 웹 사이트 검색엔진은 사용자 웹 사용 기록을 바탕으로 구축되어 웹 기록 수집을 위해 자동화 프로그램에 의존하여 무분별한 트래픽을 발생시키는 고전적인 방법에서 벗어나 더 나은 웹 생태계 환경을 만드는데 기여할 것이다. 서비스 유지를 위한 자원의 소모는 줄이고, 사용자의 정보로 구축되는 만큼 보다 더 사용자 친화적인 서비스를 제공함으로써 사용자의 더 나은 경험에 기여할 것이다.

앞으로 해당 내용을 더 발전시켜 데이터 주권 시대를 여는데 기여하고 더 나은 웹 환경을 만드는 데 목표를 둘 것이다.