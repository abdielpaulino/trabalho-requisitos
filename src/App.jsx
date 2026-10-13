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

const inputCls = 'w-full rounded border border-[#6B6751] bg-[#F3EEE3] px-3 py-2 text-sm text-[#28374A] outline-none focus:border-[#28374A]'
const btnPrimario = 'rounded bg-[#28374A] px-4 py-2 text-sm font-medium text-[#F3EEE3] hover:opacity-90 disabled:opacity-40'
const btnSecundario = 'rounded bg-[#6B6751] px-4 py-2 text-sm font-medium text-[#F3EEE3] hover:opacity-90 disabled:opacity-40'
const btnPerigo = 'rounded bg-[#754437] px-4 py-2 text-sm font-medium text-[#F3EEE3] hover:opacity-90 disabled:opacity-40'
const btnContorno = 'rounded border border-[#6B6751] bg-[#F3EEE3] px-4 py-2 text-sm font-medium text-[#28374A] hover:bg-[#D3C7AD]'
const cardCls = 'rounded border border-[#6B6751] bg-[#F3EEE3] p-4'
const thCls = 'border-b border-[#6B6751] px-3 py-2 text-left text-xs font-semibold uppercase text-[#6B6751]'
const tdCls = 'border-b border-[#6B6751]/40 px-3 py-2 text-sm text-[#28374A]'

function Requisitos({ codigos }) {
  return (
    <div className="mt-8 inline-block rounded border border-dashed border-[#6B6751] bg-[#F3EEE3] px-3 py-2 text-xs text-[#6B6751]">
      <span className="font-semibold text-[#28374A]">Requisitos atendidos: </span>
      {codigos.join(', ')}
    </div>
  )
}

function Placeholder({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded border border-[#6B6751] bg-[#F3EEE3] ${className}`}>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="#6B6751" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#6B6751" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

function TagStatus({ status }) {
  const cores = {
    Pendente: 'border-[#28374A] text-[#28374A] bg-[#F3EEE3]',
    Aprovada: 'border-[#6B6751] text-[#F3EEE3] bg-[#6B6751]',
    Rejeitada: 'border-[#754437] text-[#F3EEE3] bg-[#754437]',
    Retirada: 'border-[#28374A] text-[#F3EEE3] bg-[#28374A]',
  }
  return <span className={`inline-block rounded border px-2 py-0.5 text-xs font-semibold ${cores[status]}`}>{status}</span>
}

function TagEstoqueBaixo() {
  return <span className="inline-block rounded bg-[#754437] px-2 py-0.5 text-xs font-bold tracking-wide text-[#F3EEE3]">ESTOQUE BAIXO</span>
}

function Titulo({ titulo, subtitulo }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#28374A]">{titulo}</h1>
      {subtitulo && <p className="mt-1 text-sm text-[#6B6751]">{subtitulo}</p>}
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
    <div className="flex min-h-screen items-center justify-center bg-[#D3C7AD] p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-center gap-3">
          <Placeholder className="h-12 w-12" />
          <div>
            <div className="text-2xl font-bold text-[#28374A]">EstoqueEdu</div>
            <div className="text-xs text-[#6B6751]">Controle de estoque escolar</div>
          </div>
        </div>
        <form onSubmit={entrar} className={`${cardCls} space-y-4`}>
          <h1 className="text-lg font-semibold text-[#28374A]">Acesso ao sistema</h1>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Usuário</label>
            <input className={inputCls} value={login} onChange={(e) => setLogin(e.target.value)} disabled={bloqueado} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Senha</label>
            <input type="password" className={inputCls} value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••" disabled={bloqueado} />
          </div>
          {erro && <div className="rounded border border-[#754437] bg-[#754437]/10 px-3 py-2 text-sm font-medium text-[#754437]">{erro}</div>}
          <button type="submit" className={`${btnPrimario} w-full`} disabled={bloqueado}>Entrar</button>
          <div className="flex items-center justify-between border-t border-[#6B6751]/40 pt-3 text-xs">
            <span className="text-[#754437]">Após 5 tentativas o acesso será bloqueado</span>
            <button type="button" className="font-semibold text-[#28374A] underline" onClick={() => setAviso('Um link de recuperação foi enviado ao e-mail cadastrado (simulação).')}>Recuperar acesso</button>
          </div>
          {aviso && <div className="rounded border border-[#6B6751] px-3 py-2 text-xs text-[#6B6751]">{aviso}</div>}
          <div className="text-xs text-[#6B6751]">
            <div className="font-semibold">Usuários de teste (senha 1234):</div>
            {USUARIOS.map((u) => (
              <button key={u.login} type="button" className="mr-2 underline" onClick={() => setLogin(u.login)}>{u.login}</button>
            ))}
          </div>
        </form>
        <Requisitos codigos={['RF07', 'RNF01', 'RNF03']} />
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

  const Erro = ({ campo }) => (erros[campo] ? <div className="mt-1 text-xs text-[#754437]">{erros[campo]}</div> : null)

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#28374A]/60 p-4">
      <div className="w-full max-w-lg rounded border border-[#6B6751] bg-[#F3EEE3]">
        <div className="flex items-center justify-between border-b border-[#6B6751] px-4 py-3">
          <h2 className="font-semibold text-[#28374A]">Novo item</h2>
          <button className="text-[#6B6751]" onClick={onFechar}>✕</button>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Código (único) *</label>
            <input className={inputCls} value={form.codigo} onChange={(e) => alterar('codigo', e.target.value)} placeholder="Ex: PAP-011" />
            <Erro campo="codigo" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Nome *</label>
            <input className={inputCls} value={form.nome} onChange={(e) => alterar('nome', e.target.value)} />
            <Erro campo="nome" />
          </div>
          <div className="col-span-2">
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Descrição</label>
            <textarea className={inputCls} rows={2} value={form.descricao} onChange={(e) => alterar('descricao', e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Categoria *</label>
            <select className={inputCls} value={form.categoria} onChange={(e) => alterar('categoria', e.target.value)}>
              <option value="">Selecione...</option>
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <Erro campo="categoria" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Unidade de medida</label>
            <select className={inputCls} value={form.unidade} onChange={(e) => alterar('unidade', e.target.value)}>
              {UNIDADES.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Quantidade</label>
            <input type="number" min="0" className={inputCls} value={form.quantidade} onChange={(e) => alterar('quantidade', e.target.value)} />
            <Erro campo="quantidade" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Quantidade mínima</label>
            <input type="number" min="0" className={inputCls} value={form.minima} onChange={(e) => alterar('minima', e.target.value)} />
            <Erro campo="minima" />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-[#6B6751] px-4 py-3">
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
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className={cardCls}>
          <div className="text-xs text-[#6B6751]">Itens cadastrados</div>
          <div className="text-2xl font-bold text-[#28374A]">{itens.length}</div>
        </div>
        <div className={cardCls}>
          <div className="text-xs text-[#6B6751]">Itens ativos</div>
          <div className="text-2xl font-bold text-[#28374A]">{itens.filter((i) => i.ativo).length}</div>
        </div>
        <div className="rounded border border-[#754437] bg-[#F3EEE3] p-4">
          <div className="text-xs text-[#754437]">Com estoque baixo</div>
          <div className="text-2xl font-bold text-[#754437]">{totalBaixo}</div>
        </div>
      </div>

      <div className={`${cardCls} mb-4 flex flex-wrap items-end gap-3`}>
        <div className="min-w-56 flex-1">
          <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Buscar por nome, código ou categoria</label>
          <input className={inputCls} value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Ex: pap, ESC-002, Limpeza..." />
        </div>
        <div className="w-48">
          <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Categoria</label>
          <select className={inputCls} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas</option>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button className={btnSecundario} onClick={() => { setBusca(''); setCategoria('') }}>Limpar</button>
        <button className={btnPrimario} onClick={() => { setMensagem(''); setModal(true) }}>+ Novo item</button>
      </div>

      {mensagem && <div className="mb-4 rounded border border-[#6B6751] bg-[#F3EEE3] px-3 py-2 text-sm text-[#6B6751]">{mensagem}</div>}

      <div className="overflow-x-auto rounded border border-[#6B6751] bg-[#F3EEE3]">
        <table className="w-full">
          <thead>
            <tr>
              {['Código', 'Nome', 'Categoria', 'Unidade', 'Quantidade', 'Qtd. mínima', 'Status'].map((h) => <th key={h} className={thCls}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((i) => (
              <tr key={i.codigo} className={estoqueBaixo(i) && i.ativo ? 'bg-[#754437]/10' : ''}>
                <td className={`${tdCls} font-mono`}>{i.codigo}</td>
                <td className={tdCls}>
                  <div className="font-medium">{i.nome}</div>
                  <div className="text-xs text-[#6B6751]">{i.descricao}</div>
                </td>
                <td className={tdCls}>{i.categoria}</td>
                <td className={tdCls}>{i.unidade}</td>
                <td className={`${tdCls} font-semibold ${estoqueBaixo(i) ? 'text-[#754437]' : ''}`}>{i.quantidade}</td>
                <td className={tdCls}>{i.minima}</td>
                <td className={tdCls}>
                  <div className="flex flex-wrap gap-1">
                    <span className={`inline-block rounded border px-2 py-0.5 text-xs ${i.ativo ? 'border-[#6B6751] text-[#6B6751]' : 'border-[#28374A] text-[#28374A] line-through'}`}>{i.ativo ? 'Ativo' : 'Inativo'}</span>
                    {i.ativo && estoqueBaixo(i) && <TagEstoqueBaixo />}
                  </div>
                </td>
              </tr>
            ))}
            {!filtrados.length && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-sm text-[#6B6751]">Nenhum item encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && <ModalNovoItem itens={itens} onFechar={() => setModal(false)} onSalvar={salvar} />}
      <Requisitos codigos={['RF01', 'RF02', 'RF05', 'RF11', 'RN01', 'RN02', 'RN05', 'RN11']} />
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
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Item</label>
            <select className={inputCls} value={codigo} onChange={(e) => setCodigo(e.target.value)}>
              {ativos.map((i) => <option key={i.codigo} value={i.codigo}>{i.codigo} — {i.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Disponível</label>
            <div className="flex h-[38px] items-center gap-2 rounded border border-dashed border-[#6B6751] px-3 text-sm text-[#28374A]">
              <span className="font-bold">{selecionado?.quantidade ?? '-'}</span>
              <span className="text-[#6B6751]">{selecionado?.unidade}</span>
              {selecionado && estoqueBaixo(selecionado) && <TagEstoqueBaixo />}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Quantidade</label>
            <input type="number" min="1" className={inputCls} value={qtd} onChange={(e) => setQtd(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className={btnPrimario} onClick={solicitar}>Solicitar</button>
          {erro && <span className="text-sm text-[#754437]">{erro}</span>}
          {sucesso && <span className="text-sm text-[#6B6751]">{sucesso}</span>}
        </div>
      </div>

      <h2 className="mb-2 font-semibold text-[#28374A]">Minhas solicitações</h2>
      <div className="overflow-x-auto rounded border border-[#6B6751] bg-[#F3EEE3]">
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
                <td className={`${tdCls} text-xs text-[#6B6751]`}>{s.justificativa || s.registro || '—'}</td>
              </tr>
            ))}
            {!minhas.length && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-sm text-[#6B6751]">Você ainda não fez solicitações.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Requisitos codigos={['RF06', 'RF08', 'RN06', 'RN08']} />
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
        <div className="rounded border border-[#754437] bg-[#F3EEE3] p-6 text-[#754437]">
          <div className="font-semibold">Acesso restrito</div>
          <div className="text-sm">Somente usuários com perfil Gerente podem aprovar ou rejeitar solicitações. Use o seletor de perfil na barra superior para simular.</div>
        </div>
        <Requisitos codigos={['RF03', 'RF09', 'RF10', 'RN03', 'RN09', 'RN10']} />
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

  return (
    <div>
      <Titulo titulo="Aprovação de solicitações" subtitulo="Analise as solicitações pendentes e registre as retiradas." />
      {erro && <div className="mb-4 rounded border border-[#754437] bg-[#754437]/10 px-3 py-2 text-sm text-[#754437]">{erro}</div>}

      <h2 className="mb-2 font-semibold text-[#28374A]">Pendentes ({pendentes.length})</h2>
      <div className="mb-6 overflow-x-auto rounded border border-[#6B6751] bg-[#F3EEE3]">
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
                  <td className={`${tdCls} ${insuficiente ? 'font-semibold text-[#754437]' : ''}`}>
                    {it.quantidade} {estoqueBaixo(it) && <TagEstoqueBaixo />}
                  </td>
                  <td className={tdCls}>{s.data}</td>
                  <td className={tdCls}>
                    {rejeitando === s.id ? (
                      <div className="w-64 space-y-2">
                        <label className="block text-xs font-semibold text-[#754437]">Justificativa *</label>
                        <textarea className={inputCls} rows={2} value={justificativa} onChange={(e) => setJustificativa(e.target.value)} placeholder="Motivo da rejeição" />
                        <div className="flex gap-2">
                          <button className={btnPerigo} onClick={() => confirmarRejeicao(s)}>Confirmar rejeição</button>
                          <button className={btnContorno} onClick={() => { setRejeitando(null); setJustificativa(''); setErro('') }}>Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button className={btnSecundario} onClick={() => aprovar(s)}>Aprovar</button>
                        <button className={btnPerigo} onClick={() => { setRejeitando(s.id); setJustificativa(''); setErro('') }}>Rejeitar</button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
            {!pendentes.length && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-sm text-[#6B6751]">Nenhuma solicitação pendente.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mb-2 font-semibold text-[#28374A]">Aprovadas aguardando retirada ({aprovadas.length})</h2>
      <div className="mb-6 space-y-2">
        {aprovadas.map((s) => (
          <div key={s.id} className={`${cardCls} flex flex-wrap items-center justify-between gap-3`}>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#28374A]">
                {s.solicitante} · {item(s.codigo).nome} · {s.qtd} {item(s.codigo).unidade.toLowerCase()}(s) <TagStatus status={s.status} />
              </div>
              <div className="text-xs text-[#6B6751]">{s.registro}</div>
            </div>
            <button className={btnPrimario} onClick={() => registrarRetirada(s)}>Registrar retirada</button>
          </div>
        ))}
        {!aprovadas.length && <div className="text-sm text-[#6B6751]">Nenhuma solicitação aprovada aguardando retirada.</div>}
      </div>

      <h2 className="mb-2 font-semibold text-[#28374A]">Histórico</h2>
      <div className="overflow-x-auto rounded border border-[#6B6751] bg-[#F3EEE3]">
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
                <td className={`${tdCls} text-xs text-[#6B6751]`}>
                  <div>{s.registro}</div>
                  {s.justificativa && <div className="text-[#754437]">Justificativa: {s.justificativa}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Requisitos codigos={['RF03', 'RF09', 'RF10', 'RN03', 'RN09', 'RN10']} />
    </div>
  )
}

function GraficoBarras({ dados, destaque }) {
  const max = Math.max(1, ...dados.map((d) => d.valor))
  return (
    <div className="flex h-56 items-end gap-3 border-b border-l border-[#6B6751] px-3 pt-4">
      {dados.map((d) => (
        <div key={d.rotulo} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
          <span className="text-xs font-semibold text-[#28374A]">{d.valor}</span>
          <div className={`w-full max-w-12 rounded-t ${destaque && destaque(d) ? 'bg-[#754437]' : 'bg-[#28374A]'}`} style={{ height: `${(d.valor / max) * 80}%` }} />
          <span className="w-full truncate text-center text-[10px] text-[#6B6751]" title={d.rotulo}>{d.rotulo}</span>
        </div>
      ))}
      {!dados.length && <div className="m-auto text-sm text-[#6B6751]">Sem dados para os filtros selecionados.</div>}
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
      <div className={`${cardCls} mb-4 flex flex-wrap items-end gap-3`}>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Período — de</label>
          <input type="date" className={inputCls} value={inicio} onChange={(e) => setInicio(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#6B6751]">até</label>
          <input type="date" className={inputCls} value={fim} onChange={(e) => setFim(e.target.value)} />
        </div>
        <div className="w-48">
          <label className="mb-1 block text-xs font-semibold text-[#6B6751]">Categoria</label>
          <select className={inputCls} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas</option>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {botoes.map((b) => (
          <button key={b.id} className={tipo === b.id ? btnPrimario : btnContorno} onClick={() => { setTipo(b.id); setMensagem('') }}>{b.rotulo}</button>
        ))}
        <button className={`${btnSecundario} ml-auto`} onClick={() => setMensagem(`Relatório "${atual.titulo}" exportado (simulação) — período ${formatar(inicio)} a ${formatar(fim)}.`)}>Exportar</button>
      </div>

      {mensagem && <div className="mb-4 rounded border border-[#6B6751] bg-[#F3EEE3] px-3 py-2 text-sm text-[#6B6751]">{mensagem}</div>}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={cardCls}>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold text-[#28374A]">{atual.titulo}</h2>
            <span className="text-xs text-[#6B6751]">{formatar(inicio)} a {formatar(fim)}{categoria ? ` · ${categoria}` : ''}</span>
          </div>
          <GraficoBarras dados={atual.dados} destaque={(d) => d.baixo} />
          <div className="mt-2 flex gap-4 text-xs text-[#6B6751]">
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 bg-[#28374A]" /> Normal</span>
            <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 bg-[#754437]" /> Estoque baixo</span>
          </div>
        </div>
        <div className="overflow-x-auto rounded border border-[#6B6751] bg-[#F3EEE3]">
          <table className="w-full">
            <thead>
              <tr>{atual.colunas.map((c) => <th key={c} className={thCls}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {atual.linhas.map((l, idx) => (
                <tr key={idx}>{l.map((v, j) => <td key={j} className={`${tdCls} ${j === 0 ? 'whitespace-nowrap' : ''}`}>{v}</td>)}</tr>
              ))}
              {!atual.linhas.length && (
                <tr><td colSpan={atual.colunas.length} className="px-3 py-6 text-center text-sm text-[#6B6751]">Nenhum registro.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Requisitos codigos={['RF14', 'RN14']} />
    </div>
  )
}

function BarraSuperior({ usuario, onTrocarPerfil, onSair }) {
  return (
    <header className="flex items-center justify-between bg-[#28374A] px-4 py-3 text-[#F3EEE3]">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8 overflow-hidden rounded border border-[#F3EEE3]/60">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke="#F3EEE3" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="#F3EEE3" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <span className="text-lg font-bold tracking-wide">EstoqueEdu</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="text-right">
          <div className="font-semibold">{usuario.nome}</div>
          <div className="text-xs opacity-80">Perfil: {usuario.perfil}</div>
        </div>
        <select className="rounded border border-[#F3EEE3]/60 bg-[#28374A] px-2 py-1 text-xs text-[#F3EEE3]" value={usuario.perfil} onChange={(e) => onTrocarPerfil(e.target.value)} title="Simular perfil">
          {['Gerente', 'Fornecedor', 'Funcionário', 'Administrador'].map((p) => <option key={p}>{p}</option>)}
        </select>
        <button className="rounded border border-[#F3EEE3]/60 px-3 py-1 text-xs hover:bg-[#F3EEE3]/10" onClick={onSair}>Sair</button>
      </div>
    </header>
  )
}

function MenuLateral({ tela, setTela, pendentes }) {
  return (
    <nav className="w-56 shrink-0 bg-[#28374A] p-3 text-[#F3EEE3]">
      <div className="mb-2 px-2 text-xs uppercase tracking-wider opacity-60">Menu</div>
      <ul className="space-y-1">
        {MENU.map((m) => (
          <li key={m.id}>
            <button className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm ${tela === m.id ? 'bg-[#D3C7AD] font-semibold text-[#28374A]' : 'hover:bg-[#F3EEE3]/10'}`} onClick={() => setTela(m.id)}>
              {m.rotulo}
              {m.id === 'aprovacao' && pendentes > 0 && <span className="rounded bg-[#754437] px-1.5 text-xs text-[#F3EEE3]">{pendentes}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function App() {
  const [usuario, setUsuario] = useState(null)
  const [tela, setTela] = useState('estoque')
  const [itens, setItens] = useState(ITENS_INICIAIS)
  const [solicitacoes, setSolicitacoes] = useState(SOLICITACOES_INICIAIS)

  if (!usuario) {
    return <TelaLogin onEntrar={(u) => { setUsuario(u); setTela(u.perfil === 'Gerente' ? 'aprovacao' : 'estoque') }} />
  }

  const pendentes = solicitacoes.filter((s) => s.status === 'Pendente').length
  const props = { usuario, itens, setItens, solicitacoes, setSolicitacoes }

  return (
    <div className="flex min-h-screen flex-col bg-[#D3C7AD]">
      <BarraSuperior usuario={usuario} onTrocarPerfil={(perfil) => setUsuario({ ...usuario, perfil })} onSair={() => setUsuario(null)} />
      <div className="flex flex-1">
        <MenuLateral tela={tela} setTela={setTela} pendentes={pendentes} />
        <main className="flex-1 overflow-x-hidden p-6">
          {tela === 'estoque' && <TelaEstoque {...props} />}
          {tela === 'solicitacao' && <TelaSolicitacao {...props} />}
          {tela === 'aprovacao' && <TelaAprovacao {...props} />}
          {tela === 'relatorios' && <TelaRelatorios {...props} />}
        </main>
      </div>
    </div>
  )
}
