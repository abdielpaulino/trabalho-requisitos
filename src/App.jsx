import { useState } from 'react'

const CATEGORIAS = ['Papelaria', 'Escrita', 'Equipamentos', 'Limpeza', 'Mobiliário', 'Informática']

const UNIDADES = ['Unidade', 'Caixa', 'Pacote', 'Resma', 'Litro', 'Kit']

const USUARIOS = [
  { login: 'ana.gerente', nome: 'Ana Souza', perfil: 'Gerente' },
  { login: 'carlos.func', nome: 'Carlos Lima', perfil: 'Funcionário' },
  { login: 'papelaria.sul', nome: 'Papelaria Sul Ltda', perfil: 'Fornecedor' },
  { login: 'admin', nome: 'Beatriz Rocha', perfil: 'Administrador' },
]

const ITENS_INICIAIS = [
  { codigo: 'PAP-001', nome: 'Papel A4', descricao: 'Papel sulfite 75g', categoria: 'Papelaria', unidade: 'Resma', quantidade: 40, minima: 15, ativo: true },
  { codigo: 'ESC-002', nome: 'Caneta esferográfica azul', descricao: 'Ponta média', categoria: 'Escrita', unidade: 'Caixa', quantidade: 4, minima: 5, ativo: true },
  { codigo: 'ESC-003', nome: 'Giz branco', descricao: 'Giz escolar antialérgico', categoria: 'Escrita', unidade: 'Caixa', quantidade: 12, minima: 10, ativo: true },
  { codigo: 'EQP-004', nome: 'Projetor multimídia', descricao: 'Projetor 3000 lumens', categoria: 'Equipamentos', unidade: 'Unidade', quantidade: 3, minima: 1, ativo: true },
  { codigo: 'PAP-005', nome: 'Cola branca', descricao: 'Tubo 90g', categoria: 'Papelaria', unidade: 'Unidade', quantidade: 8, minima: 8, ativo: true },
  { codigo: 'ESC-006', nome: 'Pincel para quadro branco', descricao: 'Cores sortidas', categoria: 'Escrita', unidade: 'Kit', quantidade: 25, minima: 10, ativo: true },
  { codigo: 'INF-007', nome: 'Toner impressora', descricao: 'Toner preto compatível', categoria: 'Informática', unidade: 'Unidade', quantidade: 1, minima: 3, ativo: true },
  { codigo: 'MOB-008', nome: 'Cadeira escolar', descricao: 'Cadeira com prancheta', categoria: 'Mobiliário', unidade: 'Unidade', quantidade: 30, minima: 10, ativo: true },
  { codigo: 'LIM-009', nome: 'Detergente', descricao: 'Detergente neutro 500ml', categoria: 'Limpeza', unidade: 'Litro', quantidade: 20, minima: 6, ativo: true },
  { codigo: 'EQP-010', nome: 'Retroprojetor', descricao: 'Equipamento descontinuado', categoria: 'Equipamentos', unidade: 'Unidade', quantidade: 2, minima: 0, ativo: false },
]

const SOLICITACOES_INICIAIS = [
  { id: 1, data: '02/10/2026 08:15', solicitante: 'Carlos Lima', codigo: 'PAP-001', qtd: 5, status: 'Retirada', registro: 'Aprovado por Ana Souza em 02/10/2026 10:02', justificativa: '' },
  { id: 2, data: '05/10/2026 13:40', solicitante: 'Carlos Lima', codigo: 'ESC-003', qtd: 2, status: 'Aprovada', registro: 'Aprovado por Ana Souza em 05/10/2026 15:20', justificativa: '' },
  { id: 3, data: '07/10/2026 09:05', solicitante: 'Carlos Lima', codigo: 'EQP-004', qtd: 2, status: 'Rejeitada', registro: 'Rejeitado por Ana Souza em 07/10/2026 11:30', justificativa: 'Projetores reservados para a feira de ciências.' },
  { id: 4, data: '10/10/2026 10:22', solicitante: 'Carlos Lima', codigo: 'ESC-006', qtd: 3, status: 'Pendente', registro: '', justificativa: '' },
  { id: 5, data: '11/10/2026 14:10', solicitante: 'Marina Alves', codigo: 'PAP-005', qtd: 4, status: 'Pendente', registro: '', justificativa: '' },
  { id: 6, data: '12/10/2026 07:50', solicitante: 'João Pereira', codigo: 'ESC-002', qtd: 6, status: 'Pendente', registro: '', justificativa: '' },
  { id: 7, data: '12/10/2026 16:35', solicitante: 'Marina Alves', codigo: 'MOB-008', qtd: 5, status: 'Pendente', registro: '', justificativa: '' },
]

const MOVIMENTACOES = [
  { data: '01/10/2026', tipo: 'Entrada', item: 'Papel A4', qtd: 20, responsavel: 'Papelaria Sul Ltda', categoria: 'Papelaria' },
  { data: '02/10/2026', tipo: 'Saída', item: 'Papel A4', qtd: 5, responsavel: 'Carlos Lima', categoria: 'Papelaria' },
  { data: '03/10/2026', tipo: 'Saída', item: 'Giz branco', qtd: 4, responsavel: 'Marina Alves', categoria: 'Escrita' },
  { data: '06/10/2026', tipo: 'Entrada', item: 'Pincel para quadro branco', qtd: 15, responsavel: 'Papelaria Sul Ltda', categoria: 'Escrita' },
  { data: '08/10/2026', tipo: 'Saída', item: 'Toner impressora', qtd: 2, responsavel: 'João Pereira', categoria: 'Informática' },
  { data: '09/10/2026', tipo: 'Saída', item: 'Detergente', qtd: 4, responsavel: 'Equipe de limpeza', categoria: 'Limpeza' },
]

const CONSUMO_MENSAL = [
  { rotulo: 'Mai', valor: 42 },
  { rotulo: 'Jun', valor: 58 },
  { rotulo: 'Jul', valor: 21 },
  { rotulo: 'Ago', valor: 67 },
  { rotulo: 'Set', valor: 49 },
  { rotulo: 'Out', valor: 33 },
]

const MENU = [
  { id: 'estoque', rotulo: 'Estoque / Itens' },
  { id: 'solicitacao', rotulo: 'Nova solicitação' },
  { id: 'aprovacao', rotulo: 'Aprovação (Gerente)' },
  { id: 'relatorios', rotulo: 'Relatórios' },
]

const agora = () => new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const estoqueBaixo = (item) => item.quantidade <= item.minima

const inputCls = 'w-full rounded border border-[#4C7A1F] bg-[#FFFBF2] px-3 py-2 text-sm text-[#1B4F9C] outline-none focus:border-[#1B4F9C]'
const btnPrimario = 'rounded bg-[#1B4F9C] px-4 py-2 text-sm font-medium text-[#FFFBF2] hover:opacity-90 disabled:opacity-40'
const btnSecundario = 'rounded bg-[#4C7A1F] px-4 py-2 text-sm font-medium text-[#FFFBF2] hover:opacity-90 disabled:opacity-40'
const btnPerigo = 'rounded bg-[#C2452A] px-4 py-2 text-sm font-medium text-[#FFFBF2] hover:opacity-90 disabled:opacity-40'
const btnContorno = 'rounded border border-[#4C7A1F] bg-[#FFFBF2] px-4 py-2 text-sm font-medium text-[#1B4F9C] hover:bg-[#F4DFAF]'
const cardCls = 'rounded border border-[#4C7A1F] bg-[#FFFBF2] p-4'
const thCls = 'border-b border-[#4C7A1F] px-3 py-2 text-left text-xs font-semibold uppercase text-[#4C7A1F]'
const tdCls = 'border-b border-[#4C7A1F]/40 px-3 py-2 text-sm text-[#1B4F9C]'

function Placeholder({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded border border-[#4C7A1F] bg-[#FFFBF2] ${className}`}>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="#4C7A1F" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#4C7A1F" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

function TagStatus({ status }) {
  const cores = {
    Pendente: 'border-[#1B4F9C] text-[#1B4F9C] bg-[#FFFBF2]',
    Aprovada: 'border-[#4C7A1F] text-[#FFFBF2] bg-[#4C7A1F]',
    Rejeitada: 'border-[#C2452A] text-[#FFFBF2] bg-[#C2452A]',
    Retirada: 'border-[#1B4F9C] text-[#FFFBF2] bg-[#1B4F9C]',
  }
  return <span className={`inline-block rounded border px-2 py-0.5 text-xs font-semibold ${cores[status]}`}>{status}</span>
}

function TagEstoqueBaixo() {
  return <span className="inline-block rounded bg-[#C2452A] px-2 py-0.5 text-xs font-bold tracking-wide text-[#FFFBF2]">ESTOQUE BAIXO</span>
}

function Titulo({ titulo, subtitulo }) {
  return (
    <div className="mb-4 md:mb-6">
      <h1 className="text-xl font-bold text-[#1B4F9C] md:text-2xl">{titulo}</h1>
      {subtitulo && <p className="mt-1 text-sm text-[#4C7A1F]">{subtitulo}</p>}
    </div>
  )
}

function TelaLogin({ onEntrar }) {
  const [login, setLogin] = useState('ana.gerente')
  const [senha, setSenha] = useState('')
  const [tentativas, setTentativas] = useState(3)
  const [erro, setErro] = useState('Senha incorreta. Tentativa 3 de 5')
  const [aviso, setAviso] = useState('')
  const bloqueado = tentativas >= 5

  const entrar = (e) => {
    e.preventDefault()
    setAviso('')
    if (bloqueado) return
    const usuario = USUARIOS.find((u) => u.login === login.trim())
    if (usuario && senha === '1234') {
      onEntrar(usuario)
      return
    }
    const novas = tentativas + 1
    setTentativas(novas)
    setErro(novas >= 5 ? 'Acesso bloqueado após 5 tentativas. Utilize "Recuperar acesso".' : `Senha incorreta. Tentativa ${novas} de 5`)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4DFAF] p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-center gap-3">
          <Placeholder className="h-12 w-12" />
          <div>
            <div className="text-2xl font-bold text-[#1B4F9C]">EstoqueEdu</div>
            <div className="text-xs text-[#4C7A1F]">Controle de estoque escolar</div>
          </div>
        </div>
        <form onSubmit={entrar} className={`${cardCls} space-y-4`}>
          <h1 className="text-lg font-semibold text-[#1B4F9C]">Acesso ao sistema</h1>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Usuário</label>
            <input className={inputCls} value={login} onChange={(e) => setLogin(e.target.value)} disabled={bloqueado} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Senha</label>
            <input type="password" className={inputCls} value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••" disabled={bloqueado} />
          </div>
          {erro && <div className="rounded border border-[#C2452A] bg-[#C2452A]/10 px-3 py-2 text-sm font-medium text-[#C2452A]">{erro}</div>}
          <button type="submit" className={`${btnPrimario} w-full`} disabled={bloqueado}>Entrar</button>
          <div className="flex items-center justify-between border-t border-[#4C7A1F]/40 pt-3 text-xs">
            <span className="text-[#C2452A]">Após 5 tentativas o acesso será bloqueado</span>
            <button type="button" className="font-semibold text-[#1B4F9C] underline" onClick={() => setAviso('Um link de recuperação foi enviado ao e-mail cadastrado (simulação).')}>Recuperar acesso</button>
          </div>
          {aviso && <div className="rounded border border-[#4C7A1F] px-3 py-2 text-xs text-[#4C7A1F]">{aviso}</div>}
          <div className="text-xs text-[#4C7A1F]">
            <div className="font-semibold">Usuários de teste (senha 1234):</div>
            {USUARIOS.map((u) => (
              <button key={u.login} type="button" className="mr-2 underline" onClick={() => setLogin(u.login)}>{u.login}</button>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}

function ModalNovoItem({ itens, onFechar, onSalvar }) {
  const [form, setForm] = useState({ codigo: '', nome: '', descricao: '', categoria: '', unidade: 'Unidade', quantidade: 0, minima: 0 })
  const [erros, setErros] = useState({})

  const alterar = (campo, valor) => setForm({ ...form, [campo]: valor })

  const salvar = () => {
    const novos = {}
    if (!form.codigo.trim()) novos.codigo = 'Código é obrigatório.'
    else if (itens.some((i) => i.codigo.toLowerCase() === form.codigo.trim().toLowerCase())) novos.codigo = 'Já existe um item com este código.'
    if (!form.nome.trim()) novos.nome = 'Nome é obrigatório.'
    if (!form.categoria) novos.categoria = 'Categoria é obrigatória.'
    if (Number(form.quantidade) < 0) novos.quantidade = 'Quantidade não pode ser negativa.'
    if (Number(form.minima) < 0) novos.minima = 'Quantidade mínima não pode ser negativa.'
    setErros(novos)
    if (Object.keys(novos).length) return
    onSalvar({ ...form, codigo: form.codigo.trim().toUpperCase(), nome: form.nome.trim(), quantidade: Number(form.quantidade), minima: Number(form.minima), ativo: true })
  }

  const Erro = ({ campo }) => (erros[campo] ? <div className="mt-1 text-xs text-[#C2452A]">{erros[campo]}</div> : null)

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#1B4F9C]/60 p-4">
      <div className="w-full max-w-lg rounded border border-[#4C7A1F] bg-[#FFFBF2]">
        <div className="flex items-center justify-between border-b border-[#4C7A1F] px-4 py-3">
          <h2 className="font-semibold text-[#1B4F9C]">Novo item</h2>
          <button className="text-[#4C7A1F]" onClick={onFechar}>✕</button>
        </div>
        <div className="grid max-h-[70vh] grid-cols-1 gap-3 overflow-y-auto p-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Código (único) *</label>
            <input className={inputCls} value={form.codigo} onChange={(e) => alterar('codigo', e.target.value)} placeholder="Ex: PAP-011" />
            <Erro campo="codigo" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Nome *</label>
            <input className={inputCls} value={form.nome} onChange={(e) => alterar('nome', e.target.value)} />
            <Erro campo="nome" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Descrição</label>
            <textarea className={inputCls} rows={2} value={form.descricao} onChange={(e) => alterar('descricao', e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Categoria *</label>
            <select className={inputCls} value={form.categoria} onChange={(e) => alterar('categoria', e.target.value)}>
              <option value="">Selecione...</option>
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <Erro campo="categoria" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Unidade de medida</label>
            <select className={inputCls} value={form.unidade} onChange={(e) => alterar('unidade', e.target.value)}>
              {UNIDADES.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Quantidade</label>
            <input type="number" min="0" className={inputCls} value={form.quantidade} onChange={(e) => alterar('quantidade', e.target.value)} />
            <Erro campo="quantidade" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Quantidade mínima</label>
            <input type="number" min="0" className={inputCls} value={form.minima} onChange={(e) => alterar('minima', e.target.value)} />
            <Erro campo="minima" />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-[#4C7A1F] px-4 py-3">
          <button className={btnContorno} onClick={onFechar}>Cancelar</button>
          <button className={btnPrimario} onClick={salvar}>Salvar</button>
        </div>
      </div>
    </div>
  )
}

function TelaEstoque({ itens, setItens }) {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [modal, setModal] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const termo = busca.trim().toLowerCase()
  const filtrados = itens.filter((i) => {
    const casaBusca = !termo || i.nome.toLowerCase().includes(termo) || i.codigo.toLowerCase().includes(termo) || i.categoria.toLowerCase().includes(termo)
    const casaCategoria = !categoria || i.categoria === categoria
    return casaBusca && casaCategoria
  })
  const totalBaixo = itens.filter((i) => i.ativo && estoqueBaixo(i)).length

  const salvar = (novo) => {
    setItens([...itens, novo])
    setModal(false)
    setMensagem(`Item "${novo.nome}" cadastrado com sucesso.`)
  }

  return (
    <div>
      <Titulo titulo="Estoque / Cadastro de itens" subtitulo="Consulte, filtre e cadastre os materiais da escola." />
      <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded border border-[#4C7A1F] bg-[#FFFBF2] p-3 sm:p-4">
          <div className="text-xs text-[#4C7A1F]">Cadastrados</div>
          <div className="text-xl font-bold text-[#1B4F9C] sm:text-2xl">{itens.length}</div>
        </div>
        <div className="rounded border border-[#4C7A1F] bg-[#FFFBF2] p-3 sm:p-4">
          <div className="text-xs text-[#4C7A1F]">Ativos</div>
          <div className="text-xl font-bold text-[#1B4F9C] sm:text-2xl">{itens.filter((i) => i.ativo).length}</div>
        </div>
        <div className="rounded border border-[#C2452A] bg-[#FFFBF2] p-3 sm:p-4">
          <div className="text-xs text-[#C2452A]">Estoque baixo</div>
          <div className="text-xl font-bold text-[#C2452A] sm:text-2xl">{totalBaixo}</div>
        </div>
      </div>

      <div className={`${cardCls} mb-4 flex flex-wrap items-end gap-3`}>
        <div className="w-full sm:min-w-56 sm:flex-1">
          <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Buscar por nome, código ou categoria</label>
          <input className={inputCls} value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Ex: pap, ESC-002, Limpeza..." />
        </div>
        <div className="w-full sm:w-48">
          <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Categoria</label>
          <select className={inputCls} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas</option>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <button className={`${btnSecundario} flex-1 sm:flex-none`} onClick={() => { setBusca(''); setCategoria('') }}>Limpar</button>
          <button className={`${btnPrimario} flex-1 sm:flex-none`} onClick={() => { setMensagem(''); setModal(true) }}>+ Novo item</button>
        </div>
      </div>

      {mensagem && <div className="mb-4 rounded border border-[#4C7A1F] bg-[#FFFBF2] px-3 py-2 text-sm text-[#4C7A1F]">{mensagem}</div>}

      <div className="space-y-2 md:hidden">
        {filtrados.map((i) => (
          <div key={i.codigo} className={`rounded border bg-[#FFFBF2] p-3 ${i.ativo && estoqueBaixo(i) ? 'border-[#C2452A]' : 'border-[#4C7A1F]'}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-mono text-xs text-[#4C7A1F]">{i.codigo}</div>
                <div className="font-medium text-[#1B4F9C]">{i.nome}</div>
                <div className="text-xs text-[#4C7A1F]">{i.categoria} · {i.unidade}</div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold ${estoqueBaixo(i) ? 'text-[#C2452A]' : 'text-[#1B4F9C]'}`}>{i.quantidade}</div>
                <div className="text-xs text-[#4C7A1F]">mín. {i.minima}</div>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className={`inline-block rounded border px-2 py-0.5 text-xs ${i.ativo ? 'border-[#4C7A1F] text-[#4C7A1F]' : 'border-[#1B4F9C] text-[#1B4F9C] line-through'}`}>{i.ativo ? 'Ativo' : 'Inativo'}</span>
              {i.ativo && estoqueBaixo(i) && <TagEstoqueBaixo />}
            </div>
          </div>
        ))}
        {!filtrados.length && <div className="py-6 text-center text-sm text-[#4C7A1F]">Nenhum item encontrado.</div>}
      </div>

      <div className="hidden overflow-x-auto rounded border border-[#4C7A1F] bg-[#FFFBF2] md:block">
        <table className="w-full">
          <thead>
            <tr>
              {['Código', 'Nome', 'Categoria', 'Unidade', 'Quantidade', 'Qtd. mínima', 'Status'].map((h) => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((i) => (
              <tr key={i.codigo} className={estoqueBaixo(i) && i.ativo ? 'bg-[#C2452A]/10' : ''}>
                <td className={`${tdCls} font-mono`}>{i.codigo}</td>
                <td className={tdCls}>
                  <div className="font-medium">{i.nome}</div>
                  <div className="text-xs text-[#4C7A1F]">{i.descricao}</div>
                </td>
                <td className={tdCls}>{i.categoria}</td>
                <td className={tdCls}>{i.unidade}</td>
                <td className={`${tdCls} font-semibold ${estoqueBaixo(i) ? 'text-[#C2452A]' : ''}`}>{i.quantidade}</td>
                <td className={tdCls}>{i.minima}</td>
                <td className={tdCls}>
                  <div className="flex flex-wrap gap-1">
                    <span className={`inline-block rounded border px-2 py-0.5 text-xs ${i.ativo ? 'border-[#4C7A1F] text-[#4C7A1F]' : 'border-[#1B4F9C] text-[#1B4F9C] line-through'}`}>{i.ativo ? 'Ativo' : 'Inativo'}</span>
                    {i.ativo && estoqueBaixo(i) && <TagEstoqueBaixo />}
                  </div>
                </td>
              </tr>
            ))}
            {!filtrados.length && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-sm text-[#4C7A1F]">Nenhum item encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && <ModalNovoItem itens={itens} onFechar={() => setModal(false)} onSalvar={salvar} />}
    </div>
  )
}

function TelaSolicitacao({ usuario, itens, solicitacoes, setSolicitacoes }) {
  const ativos = itens.filter((i) => i.ativo)
  const [codigo, setCodigo] = useState(ativos[0]?.codigo || '')
  const [qtd, setQtd] = useState(1)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  const selecionado = itens.find((i) => i.codigo === codigo)
  const minhas = solicitacoes.filter((s) => s.solicitante === usuario.nome).slice().reverse()
  const nomeItem = (c) => itens.find((i) => i.codigo === c)?.nome || c

  const solicitar = () => {
    setErro('')
    setSucesso('')
    const n = Number(qtd)
    if (!selecionado) return setErro('Selecione um item.')
    if (!n || n <= 0) return setErro('Informe uma quantidade maior que zero.')
    if (n > selecionado.quantidade) return setErro(`Quantidade solicitada maior que a disponível (${selecionado.quantidade}).`)
    const nova = { id: Date.now(), data: agora(), solicitante: usuario.nome, codigo, qtd: n, status: 'Pendente', registro: '', justificativa: '' }
    setSolicitacoes([...solicitacoes, nova])
    setQtd(1)
    setSucesso('Solicitação enviada! Status: Pendente.')
  }

  return (
    <div>
      <Titulo titulo="Nova solicitação de materiais" subtitulo="Somente itens ativos podem ser solicitados." />
      <div className={`${cardCls} mb-6`}>
        <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Item</label>
            <select className={inputCls} value={codigo} onChange={(e) => setCodigo(e.target.value)}>
              {ativos.map((i) => <option key={i.codigo} value={i.codigo}>{i.codigo} — {i.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Disponível</label>
            <div className="flex h-[38px] items-center gap-2 rounded border border-dashed border-[#4C7A1F] px-3 text-sm text-[#1B4F9C]">
              <span className="font-bold">{selecionado?.quantidade ?? '-'}</span>
              <span className="text-[#4C7A1F]">{selecionado?.unidade}</span>
              {selecionado && estoqueBaixo(selecionado) && <TagEstoqueBaixo />}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Quantidade</label>
            <input type="number" min="1" className={inputCls} value={qtd} onChange={(e) => setQtd(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <button className={`${btnPrimario} w-full sm:w-auto`} onClick={solicitar}>Solicitar</button>
          {erro && <span className="text-sm text-[#C2452A]">{erro}</span>}
          {sucesso && <span className="text-sm text-[#4C7A1F]">{sucesso}</span>}
        </div>
      </div>

      <h2 className="mb-2 font-semibold text-[#1B4F9C]">Minhas solicitações</h2>
      <div className="space-y-2 md:hidden">
        {minhas.map((s) => (
          <div key={s.id} className={cardCls}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-medium text-[#1B4F9C]">{nomeItem(s.codigo)}</div>
                <div className="text-xs text-[#4C7A1F]">{s.data} · Qtd. {s.qtd}</div>
              </div>
              <TagStatus status={s.status} />
            </div>
            {(s.justificativa || s.registro) && <div className="mt-2 text-xs text-[#4C7A1F]">{s.justificativa || s.registro}</div>}
          </div>
        ))}
        {!minhas.length && <div className="py-6 text-center text-sm text-[#4C7A1F]">Você ainda não fez solicitações.</div>}
      </div>
      <div className="hidden overflow-x-auto rounded border border-[#4C7A1F] bg-[#FFFBF2] md:block">
        <table className="w-full">
          <thead>
            <tr>
              {['Data', 'Item', 'Qtd.', 'Status', 'Observação'].map((h) => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {minhas.map((s) => (
              <tr key={s.id}>
                <td className={tdCls}>{s.data}</td>
                <td className={tdCls}>{nomeItem(s.codigo)}</td>
                <td className={tdCls}>{s.qtd}</td>
                <td className={tdCls}><TagStatus status={s.status} /></td>
                <td className={`${tdCls} text-xs text-[#4C7A1F]`}>{s.justificativa || s.registro || '—'}</td>
              </tr>
            ))}
            {!minhas.length && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-sm text-[#4C7A1F]">Você ainda não fez solicitações.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TelaAprovacao({ usuario, itens, setItens, solicitacoes, setSolicitacoes }) {
  const [rejeitando, setRejeitando] = useState(null)
  const [justificativa, setJustificativa] = useState('')
  const [erro, setErro] = useState('')

  if (usuario.perfil !== 'Gerente') {
    return (
      <div>
        <Titulo titulo="Aprovação de solicitações" />
        <div className="rounded border border-[#C2452A] bg-[#FFFBF2] p-6 text-[#C2452A]">
          <div className="font-semibold">Acesso restrito</div>
          <div className="text-sm">Somente usuários com perfil Gerente podem aprovar ou rejeitar solicitações. Use o seletor de perfil na barra superior para simular.</div>
        </div>
      </div>
    )
  }

  const item = (c) => itens.find((i) => i.codigo === c)
  const pendentes = solicitacoes.filter((s) => s.status === 'Pendente')
  const aprovadas = solicitacoes.filter((s) => s.status === 'Aprovada')
  const historico = solicitacoes.filter((s) => s.status === 'Retirada' || s.status === 'Rejeitada').slice().reverse()

  const atualizar = (id, dados) => setSolicitacoes(solicitacoes.map((s) => (s.id === id ? { ...s, ...dados } : s)))

  const aprovar = (s) => {
    setErro('')
    if (s.qtd > item(s.codigo).quantidade) return setErro(`Não é possível aprovar: estoque insuficiente de "${item(s.codigo).nome}".`)
    atualizar(s.id, { status: 'Aprovada', registro: `Aprovado por ${usuario.nome} em ${agora()}` })
  }

  const confirmarRejeicao = (s) => {
    if (!justificativa.trim()) return setErro('A justificativa é obrigatória para rejeitar.')
    setErro('')
    atualizar(s.id, { status: 'Rejeitada', justificativa: justificativa.trim(), registro: `Rejeitado por ${usuario.nome} em ${agora()}` })
    setRejeitando(null)
    setJustificativa('')
  }

  const registrarRetirada = (s) => {
    setErro('')
    const it = item(s.codigo)
    if (s.qtd > it.quantidade) return setErro(`Estoque insuficiente para retirada de "${it.nome}".`)
    setItens(itens.map((i) => (i.codigo === s.codigo ? { ...i, quantidade: i.quantidade - s.qtd } : i)))
    atualizar(s.id, { status: 'Retirada', registro: `${s.registro} · Retirada registrada em ${agora()}` })
  }

  const renderAcoes = (s) => (rejeitando === s.id ? (
    <div className="w-full space-y-2 md:w-64">
      <label className="block text-xs font-semibold text-[#C2452A]">Justificativa *</label>
      <textarea className={inputCls} rows={2} value={justificativa} onChange={(e) => setJustificativa(e.target.value)} placeholder="Motivo da rejeição" />
      <div className="flex gap-2">
        <button className={`${btnPerigo} flex-1 md:flex-none`} onClick={() => confirmarRejeicao(s)}>Confirmar rejeição</button>
        <button className={`${btnContorno} flex-1 md:flex-none`} onClick={() => { setRejeitando(null); setJustificativa(''); setErro('') }}>Cancelar</button>
      </div>
    </div>
  ) : (
    <div className="flex gap-2">
      <button className={`${btnSecundario} flex-1 md:flex-none`} onClick={() => aprovar(s)}>Aprovar</button>
      <button className={`${btnPerigo} flex-1 md:flex-none`} onClick={() => { setRejeitando(s.id); setJustificativa(''); setErro('') }}>Rejeitar</button>
    </div>
  ))

  return (
    <div>
      <Titulo titulo="Aprovação de solicitações" subtitulo="Analise as solicitações pendentes e registre as retiradas." />
      {erro && <div className="mb-4 rounded border border-[#C2452A] bg-[#C2452A]/10 px-3 py-2 text-sm text-[#C2452A]">{erro}</div>}

      <h2 className="mb-2 font-semibold text-[#1B4F9C]">Pendentes ({pendentes.length})</h2>
      <div className="mb-6 space-y-2 md:hidden">
        {pendentes.map((s) => {
          const it = item(s.codigo)
          return (
            <div key={s.id} className={cardCls}>
              <div className="mb-1 flex items-start justify-between gap-2">
                <div>
                  <div className="font-medium text-[#1B4F9C]">{it.nome}</div>
                  <div className="text-xs text-[#4C7A1F]">{s.solicitante} · {s.data}</div>
                </div>
                <TagStatus status={s.status} />
              </div>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-[#1B4F9C]">
                <span>Qtd. <b>{s.qtd}</b></span>
                <span className={s.qtd > it.quantidade ? 'font-semibold text-[#C2452A]' : ''}>Disponível <b>{it.quantidade}</b></span>
                {estoqueBaixo(it) && <TagEstoqueBaixo />}
              </div>
              {renderAcoes(s)}
            </div>
          )
        })}
        {!pendentes.length && <div className="py-6 text-center text-sm text-[#4C7A1F]">Nenhuma solicitação pendente.</div>}
      </div>
      <div className="mb-6 hidden overflow-x-auto rounded border border-[#4C7A1F] bg-[#FFFBF2] md:block">
        <table className="w-full">
          <thead>
            <tr>
              {['Solicitante', 'Item', 'Qtd.', 'Disponível', 'Data', 'Ações'].map((h) => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {pendentes.map((s) => {
              const it = item(s.codigo)
              const insuficiente = s.qtd > it.quantidade
              return (
                <tr key={s.id} className="align-top">
                  <td className={tdCls}>{s.solicitante}</td>
                  <td className={tdCls}>{it.nome}</td>
                  <td className={tdCls}>{s.qtd}</td>
                  <td className={`${tdCls} ${insuficiente ? 'font-semibold text-[#C2452A]' : ''}`}>
                    {it.quantidade} {estoqueBaixo(it) && <TagEstoqueBaixo />}
                  </td>
                  <td className={tdCls}>{s.data}</td>
                  <td className={tdCls}>
                    {renderAcoes(s)}
                  </td>
                </tr>
              )
            })}
            {!pendentes.length && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-sm text-[#4C7A1F]">Nenhuma solicitação pendente.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mb-2 font-semibold text-[#1B4F9C]">Aprovadas aguardando retirada ({aprovadas.length})</h2>
      <div className="mb-6 space-y-2">
        {aprovadas.map((s) => (
          <div key={s.id} className={`${cardCls} flex flex-col gap-3 md:flex-row md:items-center md:justify-between`}>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#1B4F9C]">
                {s.solicitante} · {item(s.codigo).nome} · {s.qtd} {item(s.codigo).unidade.toLowerCase()}(s) <TagStatus status={s.status} />
              </div>
              <div className="text-xs text-[#4C7A1F]">{s.registro}</div>
            </div>
            <button className={`${btnPrimario} w-full md:w-auto`} onClick={() => registrarRetirada(s)}>Registrar retirada</button>
          </div>
        ))}
        {!aprovadas.length && <div className="text-sm text-[#4C7A1F]">Nenhuma solicitação aprovada aguardando retirada.</div>}
      </div>

      <h2 className="mb-2 font-semibold text-[#1B4F9C]">Histórico</h2>
      <div className="space-y-2 md:hidden">
        {historico.map((s) => (
          <div key={s.id} className={cardCls}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-medium text-[#1B4F9C]">{item(s.codigo).nome}</div>
                <div className="text-xs text-[#4C7A1F]">{s.solicitante} · Qtd. {s.qtd}</div>
              </div>
              <TagStatus status={s.status} />
            </div>
            <div className="mt-2 text-xs text-[#4C7A1F]">{s.registro}</div>
            {s.justificativa && <div className="text-xs text-[#C2452A]">Justificativa: {s.justificativa}</div>}
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto rounded border border-[#4C7A1F] bg-[#FFFBF2] md:block">
        <table className="w-full">
          <thead>
            <tr>
              {['Solicitante', 'Item', 'Qtd.', 'Status', 'Registro'].map((h) => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {historico.map((s) => (
              <tr key={s.id}>
                <td className={tdCls}>{s.solicitante}</td>
                <td className={tdCls}>{item(s.codigo).nome}</td>
                <td className={tdCls}>{s.qtd}</td>
                <td className={tdCls}><TagStatus status={s.status} /></td>
                <td className={`${tdCls} text-xs text-[#4C7A1F]`}>
                  <div>{s.registro}</div>
                  {s.justificativa && <div className="text-[#C2452A]">Justificativa: {s.justificativa}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function GraficoBarras({ dados, destaque }) {
  const max = Math.max(1, ...dados.map((d) => d.valor))
  return (
    <div className="flex h-48 items-end gap-1 border-b sm:h-56 sm:gap-3 border-l border-[#4C7A1F] px-3 pt-4">
      {dados.map((d) => (
        <div key={d.rotulo} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
          <span className="text-xs font-semibold text-[#1B4F9C]">{d.valor}</span>
          <div className={`w-full max-w-12 rounded-t ${destaque && destaque(d) ? 'bg-[#C2452A]' : 'bg-[#1B4F9C]'}`} style={{ height: `${(d.valor / max) * 80}%` }} />
          <span className="w-full truncate text-center text-[10px] text-[#4C7A1F]" title={d.rotulo}>{d.rotulo}</span>
        </div>
      ))}
      {!dados.length && <div className="m-auto text-sm text-[#4C7A1F]">Sem dados para os filtros selecionados.</div>}
    </div>
  )
}

function TelaRelatorios({ itens }) {
  const [inicio, setInicio] = useState('2026-05-01')
  const [fim, setFim] = useState('2026-10-31')
  const [categoria, setCategoria] = useState('')
  const [tipo, setTipo] = useState('estoque')
  const [mensagem, setMensagem] = useState('')

  const itensFiltrados = itens.filter((i) => i.ativo && (!categoria || i.categoria === categoria))
  const movFiltradas = MOVIMENTACOES.filter((m) => !categoria || m.categoria === categoria)

  const relatorios = {
    estoque: {
      titulo: 'Estoque atual',
      dados: itensFiltrados.map((i) => ({ rotulo: i.nome, valor: i.quantidade, baixo: estoqueBaixo(i) })),
      colunas: ['Código', 'Item', 'Categoria', 'Quantidade', 'Mínima'],
      linhas: itensFiltrados.map((i) => [i.codigo, i.nome, i.categoria, i.quantidade, i.minima]),
    },
    movimentacoes: {
      titulo: 'Movimentações',
      dados: [
        { rotulo: 'Entradas', valor: movFiltradas.filter((m) => m.tipo === 'Entrada').reduce((a, m) => a + m.qtd, 0) },
        { rotulo: 'Saídas', valor: movFiltradas.filter((m) => m.tipo === 'Saída').reduce((a, m) => a + m.qtd, 0) },
      ],
      colunas: ['Data', 'Tipo', 'Item', 'Qtd.', 'Responsável'],
      linhas: movFiltradas.map((m) => [m.data, m.tipo, m.item, m.qtd, m.responsavel]),
    },
    consumo: {
      titulo: 'Consumo por período',
      dados: CONSUMO_MENSAL.map((c) => ({ ...c, valor: categoria ? Math.round(c.valor / 3) : c.valor })),
      colunas: ['Mês', 'Itens consumidos'],
      linhas: CONSUMO_MENSAL.map((c) => [c.rotulo, categoria ? Math.round(c.valor / 3) : c.valor]),
    },
    escassos: {
      titulo: 'Itens escassos',
      dados: itensFiltrados.filter(estoqueBaixo).map((i) => ({ rotulo: i.nome, valor: i.quantidade, baixo: true })),
      colunas: ['Código', 'Item', 'Quantidade', 'Mínima', 'Repor'],
      linhas: itensFiltrados.filter(estoqueBaixo).map((i) => [i.codigo, i.nome, i.quantidade, i.minima, Math.max(0, i.minima * 2 - i.quantidade)]),
    },
  }

  const atual = relatorios[tipo]
  const botoes = [
    { id: 'estoque', rotulo: 'Estoque atual' },
    { id: 'movimentacoes', rotulo: 'Movimentações' },
    { id: 'consumo', rotulo: 'Consumo por período' },
    { id: 'escassos', rotulo: 'Itens escassos' },
  ]
  const formatar = (d) => d.split('-').reverse().join('/')

  return (
    <div>
      <Titulo titulo="Relatórios" subtitulo="Visualize indicadores do estoque a partir dos filtros." />
      <div className={`${cardCls} mb-4 grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap`}>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Período — de</label>
          <input type="date" className={inputCls} value={inicio} onChange={(e) => setInicio(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">até</label>
          <input type="date" className={inputCls} value={fim} onChange={(e) => setFim(e.target.value)} />
        </div>
        <div className="col-span-2 w-full sm:w-48">
          <label className="mb-1 block text-xs font-semibold text-[#4C7A1F]">Categoria</label>
          <select className={inputCls} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas</option>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {botoes.map((b) => (
          <button key={b.id} className={tipo === b.id ? btnPrimario : btnContorno} onClick={() => { setTipo(b.id); setMensagem('') }}>{b.rotulo}</button>
        ))}
        <button className={`${btnSecundario} col-span-2 sm:ml-auto`} onClick={() => setMensagem(`Relatório "${atual.titulo}" exportado (simulação) — período ${formatar(inicio)} a ${formatar(fim)}.`)}>Exportar</button>
      </div>

      {mensagem && <div className="mb-4 rounded border border-[#4C7A1F] bg-[#FFFBF2] px-3 py-2 text-sm text-[#4C7A1F]">{mensagem}</div>}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={`${cardCls} min-w-0`}>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold text-[#1B4F9C]">{atual.titulo}</h2>
            <span className="text-xs text-[#4C7A1F]">{formatar(inicio)} a {formatar(fim)}{categoria ? ` · ${categoria}` : ''}</span>
          </div>
          <GraficoBarras dados={atual.dados} destaque={(d) => d.baixo} />
          <div className="mt-2 flex gap-4 text-xs text-[#4C7A1F]">
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 bg-[#1B4F9C]" /> Normal</span>
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 bg-[#C2452A]" /> Estoque baixo</span>
          </div>
        </div>
        <div className="min-w-0 overflow-x-auto rounded border border-[#4C7A1F] bg-[#FFFBF2]">
          <table className="w-full">
            <thead>
              <tr>{atual.colunas.map((c) => <th key={c} className={thCls}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {atual.linhas.map((l, idx) => (
                <tr key={idx}>{l.map((v, j) => <td key={j} className={`${tdCls} ${j === 0 ? 'whitespace-nowrap' : ''}`}>{v}</td>)}</tr>
              ))}
              {!atual.linhas.length && (
                <tr><td colSpan={atual.colunas.length} className="px-3 py-6 text-center text-sm text-[#4C7A1F]">Nenhum registro.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const PERFIS = ['Gerente', 'Fornecedor', 'Funcionário', 'Administrador']

function BarraSuperior({ usuario, onTrocarPerfil, onSair, onAbrirMenu }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-2 bg-[#1B4F9C] px-3 py-3 text-[#FFFBF2] md:px-4">
      <div className="flex items-center gap-2 md:gap-3">
        <button className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded border border-[#FFFBF2]/60 md:hidden" onClick={onAbrirMenu} aria-label="Abrir menu">
          <span className="block h-0.5 w-4 bg-[#FFFBF2]" />
          <span className="block h-0.5 w-4 bg-[#FFFBF2]" />
          <span className="block h-0.5 w-4 bg-[#FFFBF2]" />
        </button>
        <div className="relative hidden h-8 w-8 overflow-hidden rounded border border-[#FFFBF2]/60 sm:block">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFFBF2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFFBF2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <span className="text-lg font-bold tracking-wide">EstoqueEdu</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="min-w-0 text-right">
          <div className="truncate font-semibold">{usuario.nome}</div>
          <div className="text-xs opacity-80">{usuario.perfil}</div>
        </div>
        <select className="hidden rounded border border-[#FFFBF2]/60 bg-[#1B4F9C] px-2 py-1 text-xs text-[#FFFBF2] md:block" value={usuario.perfil} onChange={(e) => onTrocarPerfil(e.target.value)} title="Simular perfil">
          {PERFIS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <button className="hidden rounded border border-[#FFFBF2]/60 px-3 py-1 text-xs hover:bg-[#FFFBF2]/10 md:block" onClick={onSair}>Sair</button>
      </div>
    </header>
  )
}

function ListaMenu({ tela, onSelecionar, pendentes }) {
  return (
    <ul className="space-y-1">
      {MENU.map((m) => (
        <li key={m.id}>
          <button className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm ${tela === m.id ? 'bg-[#F4DFAF] font-semibold text-[#1B4F9C]' : 'hover:bg-[#FFFBF2]/10'}`} onClick={() => onSelecionar(m.id)}>
            {m.rotulo}
            {m.id === 'aprovacao' && pendentes > 0 && <span className="rounded bg-[#C2452A] px-1.5 text-xs text-[#FFFBF2]">{pendentes}</span>}
          </button>
        </li>
      ))}
    </ul>
  )
}

function MenuLateral({ tela, setTela, pendentes }) {
  return (
    <nav className="hidden w-56 shrink-0 bg-[#1B4F9C] p-3 text-[#FFFBF2] md:block">
      <div className="mb-2 px-2 text-xs uppercase tracking-wider opacity-60">Menu</div>
      <ListaMenu tela={tela} onSelecionar={setTela} pendentes={pendentes} />
    </nav>
  )
}

function MenuMobile({ usuario, tela, setTela, pendentes, onTrocarPerfil, onSair, onFechar }) {
  return (
    <div className="fixed inset-0 z-30 md:hidden">
      <div className="absolute inset-0 bg-[#1B4F9C]/60" onClick={onFechar} />
      <nav className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-[#1B4F9C] p-4 text-[#FFFBF2]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-bold">EstoqueEdu</span>
          <button className="rounded border border-[#FFFBF2]/60 px-2 py-1 text-xs" onClick={onFechar} aria-label="Fechar menu">✕</button>
        </div>
        <div className="mb-4 rounded border border-[#FFFBF2]/30 p-3">
          <div className="font-semibold">{usuario.nome}</div>
          <label className="mt-2 block text-xs opacity-70">Perfil</label>
          <select className="mt-1 w-full rounded border border-[#FFFBF2]/60 bg-[#1B4F9C] px-2 py-1 text-sm text-[#FFFBF2]" value={usuario.perfil} onChange={(e) => onTrocarPerfil(e.target.value)}>
            {PERFIS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="mb-2 px-2 text-xs uppercase tracking-wider opacity-60">Menu</div>
        <ListaMenu tela={tela} onSelecionar={(id) => { setTela(id); onFechar() }} pendentes={pendentes} />
        <button className="mt-auto rounded border border-[#FFFBF2]/60 px-3 py-2 text-sm" onClick={onSair}>Sair</button>
      </nav>
    </div>
  )
}

export default function App() {
  const [usuario, setUsuario] = useState(null)
  const [tela, setTela] = useState('estoque')
  const [itens, setItens] = useState(ITENS_INICIAIS)
  const [solicitacoes, setSolicitacoes] = useState(SOLICITACOES_INICIAIS)
  const [menuAberto, setMenuAberto] = useState(false)

  if (!usuario) {
    return <TelaLogin onEntrar={(u) => { setUsuario(u); setTela(u.perfil === 'Gerente' ? 'aprovacao' : 'estoque') }} />
  }

  const pendentes = solicitacoes.filter((s) => s.status === 'Pendente').length
  const props = { usuario, itens, setItens, solicitacoes, setSolicitacoes }
  const trocarPerfil = (perfil) => setUsuario({ ...usuario, perfil })
  const sair = () => { setMenuAberto(false); setUsuario(null) }

  return (
    <div className="flex min-h-screen flex-col bg-[#F4DFAF]">
      <BarraSuperior usuario={usuario} onTrocarPerfil={trocarPerfil} onSair={sair} onAbrirMenu={() => setMenuAberto(true)} />
      {menuAberto && <MenuMobile usuario={usuario} tela={tela} setTela={setTela} pendentes={pendentes} onTrocarPerfil={trocarPerfil} onSair={sair} onFechar={() => setMenuAberto(false)} />}
      <div className="flex flex-1">
        <MenuLateral tela={tela} setTela={setTela} pendentes={pendentes} />
        <main className="min-w-0 flex-1 p-4 md:p-6">
          {tela === 'estoque' && <TelaEstoque {...props} />}
          {tela === 'solicitacao' && <TelaSolicitacao {...props} />}
          {tela === 'aprovacao' && <TelaAprovacao {...props} />}
          {tela === 'relatorios' && <TelaRelatorios {...props} />}
        </main>
      </div>
    </div>
  )
}
