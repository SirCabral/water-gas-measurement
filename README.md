Descrição
Este serviço gerencia operações relacionadas a leitura de gas e água com envio de imagem. A documentação abaixo explica como usar Docker para configurar e executar o serviço.

Requisitos
Docker: Certifique-se de ter o Docker instalado em sua máquina. Você pode baixar e instalar o Docker a partir de Docker Desktop ou Docker Engine.
Instalação
Clone o repositório:

bash
git clone https://github.com/SirCabral/water-gas-measurement
cd water-gas-measurement
Construir a imagem Docker:

bash
docker-compose up --build
Configuração
Crie um arquivo .env: Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias conforme o arquivo .env.example

bash
docker-compose up -d
O docker-compose vai criar os containers necessários com base nas configurações do arquivo docker-compose.yml e deixará o serviço disponível.




OBSERVAÇÕES:


Post / Upload

• Verificar se já existe uma leitura no mês naquele tipo de leitura.
Nessa etapa não foi muito detalhado, mas eu coloquei uma verificação da leitura do Mês levando em consideração o customer_code (que é o codigo do usuário).
Pra mim faz sentido se é uma verificação de se já teve uma leitura anterior ser baseado naquele usuário específico e não baseado em todas as leituras de todos os usuários.


.env
Deixei um arquivo de exemplo do .env com algumas informações adicionais de configuração do banco de dados, mas elas são opcionais.
