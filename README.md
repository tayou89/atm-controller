# ATM Controller

JavaScript로 구현한 간단한 ATM Controller입니다.

카드 삽입부터 PIN 인증, 계좌 조회 및 선택, 잔액 조회, 입금, 출금, 카드 배출까지의
기본적인 ATM 동작 흐름을 구현했습니다.

ATM Controller가 Bank System 및 Cash Bin의 구체적인 구현과 직접 결합되지 않도록 구성하여,
현재는 테스트용 Bank와 CashBin을 사용하지만 향후 실제 은행 시스템이나 ATM 현금 장치로
교체할 수 있도록 설계했습니다.

---

## 주요 기능

- 카드 삽입
- PIN 인증
- 카드에 연결된 계좌 목록 조회
- 계좌 선택
- 잔액 조회
- 현금 입금
- 현금 출금
- 카드 배출
- 존재하지 않는 카드 검증
- 존재하지 않는 계좌 검증
- 잔액 부족 시 출금 방지
- ATM 보유 현금 부족 시 출금 방지
- ATM 상태에 따른 잘못된 동작 순서 방지

---

## 프로젝트 구조

```text
atm-controller/
├── atm-controller.js
├── package.json
├── package-lock.json
├── README.md
└── test/
    ├── atm-controller.test.js
    ├── bank.js
    ├── cash-bin.js
    └── card-list.js
```
---

# 설치 및 실행 방법

## 1. Repository Clone

저장소를 로컬 환경에 Clone 합니다.

```bash
git clone https://github.com/tayou89/atm-controller.git
```
---

## 2. 프로젝트 디렉터리 이동

```bash
cd atm-controller
```

---

## 3. Dependency 설치

Node.js와 npm이 설치되어 있어야 합니다.

프로젝트에 필요한 dependency를 설치합니다.

```bash
npm install
```

`package.json`과 `package-lock.json`에 정의된 dependency가 설치됩니다.

---

## 4. 테스트 실행

다음 명령어로 전체 테스트를 실행할 수 있습니다.

```bash
npm test
```
---

현재 다음 상황을 테스트합니다.

### 1. 정상적인 ATM 사용

```text
카드 삽입
→ PIN 입력
→ 계좌 목록 조회
→ 계좌 선택
→ 잔액 조회
```

정상적인 ATM 사용 흐름이 수행되는지 확인합니다.

### 2. 입금

입금 이후:

```text
새로운 잔액 = 기존 잔액 + 입금 금액
```

이 되는지 확인합니다.

### 3. 출금

출금 이후:

```text
새로운 잔액 = 기존 잔액 - 출금 금액
```

이 되는지 확인합니다.

### 4. 잔액 부족

계좌 잔액보다 큰 금액을 출금하려는 경우
Bank에서 거래가 거부되는지 확인합니다.

### 5. 존재하지 않는 계좌

현재 카드와 연결되지 않은 계좌를 선택하는 경우
Error가 발생하는지 확인합니다.

### 6. 존재하지 않는 카드

Bank에 등록되어 있지 않은 카드로 인증을 시도하는 경우
Error가 발생하는지 확인합니다.

---

# 기술 스택

```text
JavaScript
Node.js
Jest
```

---