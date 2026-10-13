# EstoqueEdu

Protótipo de baixa fidelidade de um sistema de controle de estoque escolar, feito em React + Tailwind CSS.
É apenas figurativo: não há backend, API ou banco de dados. Todos os dados são mockados em `src/App.jsx`
e as ações (salvar, aprovar, rejeitar, solicitar, registrar retirada) alteram apenas o estado local.

## Como executar

```bash
npm install
npm run dev
```

## Acesso

Senha de todos os usuários de teste: `1234`

| Usuário        | Perfil        |
| -------------- | ------------- |
| ana.gerente    | Gerente       |
| carlos.func    | Funcionário   |
| papelaria.sul  | Fornecedor    |
| admin          | Administrador |

O seletor de perfil na barra superior permite simular outro perfil sem sair do sistema.

## Telas

1. Login — RF07, RNF01, RNF03
2. Estoque / Cadastro de itens — RF01, RF02, RF05, RF11, RN01, RN02, RN05, RN11
3. Nova solicitação de materiais — RF06, RF08, RN06, RN08
4. Aprovação de solicitações (Gerente) — RF03, RF09, RF10, RN03, RN09, RN10
5. Relatórios — RF14, RN14
