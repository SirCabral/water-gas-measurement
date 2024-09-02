# Water and Gas Measurement Service

Este serviço gerencia operações relacionadas à leitura de gás e água, incluindo o envio de imagens. A documentação abaixo explica como configurar e executar o serviço utilizando Docker.

## Requisitos

- **Docker:** Certifique-se de ter o Docker instalado em sua máquina. Você pode baixar e instalar o Docker a partir do [Docker Desktop](https://www.docker.com/products/docker-desktop) ou do [Docker Engine](https://docs.docker.com/engine/install/).

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/SirCabral/water-gas-measurement
    cd water-gas-measurement
    ```

2. Construa a imagem Docker:

    ```bash
    docker-compose up --build
    ```

## Configuração

1. Crie um arquivo `.env`: Na raiz do projeto, crie um arquivo `.env` com as variáveis de ambiente necessárias, conforme o exemplo em `.env.example`.

2. Inicie os containers:

    ```bash
    docker-compose up -d
    ```

    O Docker Compose vai criar os containers necessários com base nas configurações do arquivo `docker-compose.yml` e deixará o serviço disponível.

## Observações

### POST / Upload

- Verifique se já existe uma leitura para o mês e o tipo de leitura especificado.
  
  **Nota:** A verificação considera o `customer_code` (código do usuário). Faz sentido que a verificação seja baseada no usuário específico, e não em todas as leituras de todos os usuários.

### Arquivo `.env`

- Um arquivo de exemplo `.env` foi fornecido com informações adicionais de configuração do banco de dados. Essas informações são opcionais, mas podem ser ajustadas conforme necessário.
