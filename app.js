const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const crafts = {
  漆扇: { title: '福州漆扇', category: '漆艺 · 福建福州', description: '把天然漆滴入水中，轻轻一转，水面上的纹样就落在扇面上。每一把都独一无二。', maker: '代表传承人 · 福州漆艺匠人', art: 'fan-art', symbol: '扇', photo: 'https://aka.doubaocdn.com/s/RDdxZYFrQ2', encyclopedia: '漆扇以水为画布，利用漆与水不相溶的特性形成自然纹样。匠人将扇面轻轻掠过水面，图案便附着其上。' },
  扎染: { title: '白族扎染', category: '染织技艺 · 云南大理', description: '先用针线或绳子把布料扎结，再放进蓝靛染缸。染料染不到的地方，就留下了白色花纹。', maker: '代表传承人 · 大理周城扎染匠人', art: 'tie-dye', symbol: '✳', photo: 'https://aka.doubaocdn.com/s/VsCbtVoInK', encyclopedia: '扎染古称绞缬，是先扎结织物再浸染的染色技艺。扎紧处染料进不去，拆线后便呈现蓝白相间的图案。' },
  竹编: { title: '东阳竹编', category: '传统技艺 · 浙江东阳', description: '竹篾在手艺人的指尖穿梭，一经一纬，慢慢编出轻巧又结实的生活器物。', maker: '代表传承人 · 东阳竹编匠人', art: 'weave-art', symbol: '▧', photo: 'https://aka.doubaocdn.com/s/EXSelYQjD9', encyclopedia: '竹编以竹子为原料，经刮青、分篾、起底、编织等工序制成。细篾交错形成图案，也让器物保持轻巧结实。' },
  侗族大歌: { title: '侗族大歌', category: '传统音乐 · 贵州黔东南', description: '不看谱、不伴奏，侗寨鼓楼里一群人对唱，多声部和声像山野的回音一样彼此应和。', maker: '代表传承人 · 胡官美（贵州榕江）', art: 'sound-art', symbol: '♪', photo: '', encyclopedia: '侗族大歌是无伴奏、无指挥的多声部民间合唱，模拟鸟鸣虫唱、山林流水，被称为“天籁之音”，多在侗寨鼓楼以歌队对唱形式演唱。' },
  古琴艺术: { title: '古琴艺术', category: '传统音乐 · 全国（多琴派）', description: '七根弦，一按一挑，弹出中国人三千年的心事。琴声沉静悠远，讲究余韵。', maker: '代表传承人 · 虞山、广陵等琴派', art: 'sound-art', symbol: '♪', photo: '', encyclopedia: '古琴是中国最古老的弹拨乐器之一，七弦十三徽，音色沉静悠远，与棋、书、画并称“文人四艺”，代表曲目有《广陵散》《流水》《梅花三弄》。' },
  苏州评弹: { title: '苏州评弹', category: '曲艺 · 江苏苏州', description: '一张桌、一把三弦琵琶，吴侬软语把江南故事说唱得有滋有味。', maker: '代表传承人 · 苏州评弹艺术家', art: 'sound-art', symbol: '♪', photo: '', encyclopedia: '苏州评弹是苏州评话与苏州弹词的合称，用苏州方言说唱。评话只说不唱，弹词说噱弹唱、三弦琵琶伴奏，一部《珍珠塔》《三笑》可连说数月。' }
};
const lessonSteps = [
  { title: '扎好第一道纹路', description: '把布料沿对角线轻轻折叠，边缘尽量对齐。', tip: '折叠时不要拉得太紧，留一点空间让染料慢慢渗开。' },
  { title: '把布折成小方块', description: '像折纸一样把长条布料来回叠起，整理成方形。', tip: '每一层尽量叠平整，花纹会更清晰。' },
  { title: '绑出留白图案', description: '用棉线在布块上绕几圈，轻轻打结固定。', tip: '把中心位置绑紧一些，边缘的线圈可以稍微松一点。' },
  { title: '浸入蓝靛染缸', description: '戴好手套，将扎好的布慢慢浸入染液中。', tip: '轻轻按压布料，让染液均匀浸润，不要用力搅动。' },
  { title: '等待颜色沉下来', description: '取出布料，轻轻挤去多余染液，静置片刻。', tip: '刚取出时颜色会偏绿，接触空气后会慢慢变蓝。' },
  { title: '展开你的作品', description: '拆开棉线，展开布料，看看独一无二的纹样。', tip: '第一次清洗请单独冷水漂洗，帮助浮色褪去。' }
];

const defaultEntries = [
  { id: 'e1', kind: '看了', title: '看了 · 福州漆扇', detail: '水面作画的漆艺小秘密', art: 'fan-art', symbol: '扇', date: '今天 14:20', craft: '漆扇' },
  { id: 'e2', kind: '问了', title: '问了 · 扎染为什么有深浅？', detail: '传承人聊蓝白纹样的由来', art: 'tie-dye', symbol: '✳', date: '今天 13:46', craft: '扎染' },
  { id: 'e3', kind: '做了', title: '做了 · 我的第一块扎染方巾', detail: '完成了 6 个跟学步骤', art: 'tie-dye', symbol: '✳', date: '昨天 16:08', craft: '扎染' },
  { id: 'e4', kind: '看了', title: '看了 · 东阳竹编', detail: '经纬之间的生活巧思', art: 'weave-art', symbol: '▧', date: '10 月 24 日', craft: '竹编' },
  { id: 'e5', kind: '问了', title: '问了 · 漆扇上的花纹怎么做？', detail: '从一滴漆开始的水上画', art: 'fan-art', symbol: '扇', date: '10 月 23 日', craft: '漆扇' },
  { id: 'e6', kind: '看了', title: '看了 · 白族扎染', detail: '一针一线留下自然纹样', art: 'tie-dye', symbol: '✳', date: '10 月 22 日', craft: '扎染' }
];
let entries;
try { entries = JSON.parse(localStorage.getItem('artisan-journal') || 'null') || defaultEntries; } catch { entries = [...defaultEntries]; }
let activeFilter = '全部';
let currentCraft = '扎染';
let currentResultCraft = '漆扇';
let currentStep = 0;
let stepAttempts = 0;
let chatTurns = 0;
let recognitionTimer;
let toastTimer;

function persist() {
  try { localStorage.setItem('artisan-journal', JSON.stringify(entries)); } catch { /* storage may be unavailable */ }
  renderJournal();
}
function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 2400);
}
function navigate(tab) {
  const screen = $(`#${tab}Screen`);
  if (!screen) return;
  $$('.screen').forEach(item => item.classList.toggle('active', item === screen));
  $$('.tab').forEach(item => item.classList.toggle('active', item.dataset.tab === tab));
  $('#appMain').scrollTo({ top: 0, behavior: 'smooth' });
  if (tab === 'journal') renderJournal();
  if (tab === 'chat') setTimeout(() => $('#chatInput').focus({ preventScroll: true }), 280);
}
function showModal(markup) {
  $('#modalContent').innerHTML = `<div class="modal-grip"></div>${markup}`;
  $('#modal').classList.remove('hidden');
  $('#modal').addEventListener('click', closeModalOnBackdrop, { once: true });
}
function closeModal() {
  clearTimeout(recognitionTimer);
  if (recorder && recorder.state !== 'inactive') {
    try { recorderStream?.getTracks().forEach(track => track.stop()); } catch {}
    recorder = null;
  }
  if (recordingClock) { clearInterval(recordingClock); recordingClock = null; recordingSeconds = 0; }
  $('#modal').classList.add('hidden');
}
function closeModalOnBackdrop(event) {
  if (event.target === $('#modal') || event.target.closest('.modal-close')) closeModal();
  else $('#modal').addEventListener('click', closeModalOnBackdrop, { once: true });
}
function addEntry(kind, craft, title, detail) {
  const item = crafts[craft] || crafts.扎染;
  entries.unshift({ id: `e${Date.now()}`, kind, craft, title: `${kind} · ${title || item.title}`, detail: detail || item.category, art: item.art, symbol: item.symbol, date: '刚刚' });
  persist();
}
function resultModal(craft, source = 'sample') {
  const item = crafts[craft] || crafts.漆扇;
  currentResultCraft = crafts[craft] ? craft : '漆扇';
  const photoText = source === 'audio' ? '录音已上传 · mock 识别' : source === 'photo' ? '照片已上传 · mock 识别' : '识别示例 · mock 结果';
  showModal(`<div class="modal-top"><span>${photoText}</span><button class="modal-close" aria-label="关闭">×</button></div><div class="result-art ${item.art}" style="background-image:url('${item.photo}')">${item.symbol}</div><span class="eyebrow">WE FOUND A CRAFT</span><h2 class="result-title">这是 · ${item.title}</h2><p class="result-desc">${item.description}</p><div class="result-meta"><span>${item.category}</span><span>${item.maker}</span></div><div class="result-actions"><button data-result-action="百科">查看百科<small>了解来处</small></button><button data-result-action="问答">问传承人<small>继续聊聊</small></button><button data-result-action="跟学">我也要试试<small>动手体验</small></button></div>`);
  addEntry('看了', craft, item.title, source === 'audio' ? '用声音认识一门非遗' : '认识一件非遗手艺');
}
function identify(craft, source = 'sample') {
  clearTimeout(recognitionTimer);
  showModal(`<div class="modal-top"><span>正在辨认作品</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame">⌾</div><p class="demo-copy">匠人正在从纹样与做法里寻找线索…</p>`);
  recognitionTimer = setTimeout(() => resultModal(craft, source), 950);
}
function openCandidates() {
  showModal(`<div class="modal-top"><span>IDENTIFY · 可能的手艺</span><button class="modal-close" aria-label="关闭">×</button></div><h2 class="result-title">这件作品有点特别</h2><p class="result-desc">我们找到几种相近的传统技艺，选一个最像的继续了解。</p>${['漆扇','扎染','竹编'].map(name => { const item = crafts[name]; return `<button class="candidate" data-candidate="${name}"><span class="candidate-art ${item.art}" style="background-image:url('${item.photo}')">${item.symbol}</span><span><strong>${item.title}</strong><small>${item.category}</small></span><b>→</b></button>`; }).join('')}<button class="delete-link" id="noMatchBtn">都不太像？用文字描述，让传承人帮你看看</button>`);
}
function updateStep() {
  const step = lessonSteps[currentStep];
  $('#lessonName').textContent = step.title;
  $('#lessonDesc').textContent = step.description;
  $('#lessonTip').textContent = step.tip;
  $('#lessonCraft').textContent = currentCraft === '扎染' ? '扎染体验' : `${currentCraft}体验`;
  $('#stepCount').textContent = `第 ${currentStep + 1} 步 · 共 ${lessonSteps.length} 步`;
  $('#stepNumber').textContent = String(currentStep + 1).padStart(2, '0');
  const item = crafts[currentCraft] || crafts.扎染;
  $('#lessonVisual').style.backgroundImage = `linear-gradient(160deg,rgba(18,34,48,.18),rgba(18,34,48,.05)),url('${item.photo}')`;
  $('#stepTrack').innerHTML = lessonSteps.map((_, index) => `${index ? `<span class="step-link ${index <= currentStep ? 'done' : ''}"></span>` : ''}<span class="step-dot ${index < currentStep ? 'done' : index === currentStep ? 'current' : ''}">${index < currentStep ? '✓' : index + 1}</span>`).join('');
  $('#lessonFeedback').classList.add('hidden');
  $('#checkStep').disabled = false;
  $('#checkStep').style.opacity = '1';
}
function startLesson(course = '扎染方巾') {
  currentCraft = course.includes('漆扇') ? '漆扇' : course.includes('竹编') ? '竹编' : '扎染';
  currentStep = Number(localStorage.getItem(`lesson-step-${currentCraft}`) || 0);
  $('#courseList').classList.add('hidden');
  $('#lessonView').classList.remove('hidden');
  updateStep();
  $('#learnScreen').scrollTo?.(0, 0);
  $('#appMain').scrollTo({ top: 0, behavior: 'smooth' });
}
function mockStepCheck() {
  const button = $('#checkStep');
  button.disabled = true;
  button.style.opacity = '.65';
  button.querySelector('strong').textContent = '匠人正在看你的作品…';
  setTimeout(() => {
    stepAttempts += 1;
    const feedback = $('#lessonFeedback');
    feedback.classList.remove('hidden', 'good', 'mid', 'bad');
    if (stepAttempts % 3 === 1) {
      feedback.classList.add('mid');
      feedback.innerHTML = '<strong>有个小地方可以调整</strong><br />左上角的折边稍微松了一点，把它向里再压一下，展开后的纹样会更整齐。调整好可以再拍一次。';
      button.disabled = false;
      button.style.opacity = '1';
      button.querySelector('strong').textContent = '再拍一次，让匠人看看';
    } else {
      feedback.classList.add('good');
      feedback.innerHTML = '<strong>这一步做得很稳！</strong><br />折边整齐，松紧也合适。我们继续下一步吧。';
      button.querySelector('strong').textContent = '已通过 · 继续下一步';
      button.disabled = false;
      button.style.opacity = '1';
      button.onclick = advanceStep;
    }
  }, 1100);
}
function advanceStep() {
  $('#checkStep').onclick = null;
  $('#checkStep').querySelector('strong').textContent = '拍好啦，让匠人看看';
  if (currentStep < lessonSteps.length - 1) {
    currentStep += 1;
    stepAttempts = 0;
    try { localStorage.setItem(`lesson-step-${currentCraft}`, String(currentStep)); } catch {}
    updateStep();
    $('#lessonVisual').classList.add('pulse');
    setTimeout(() => $('#lessonVisual').classList.remove('pulse'), 550);
    return;
  }
  try { localStorage.removeItem(`lesson-step-${currentCraft}`); } catch {}
  addEntry('做了', currentCraft, `我的第一件${currentCraft}作品`, '完成了全部跟学步骤');
  $('#statWorks').textContent = String(Number($('#statWorks').textContent) + 1);
  showModal(`<div class="modal-top"><span>A SMALL MASTERPIECE</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame">✳</div><span class="eyebrow">你完成了一件手艺</span><h2 class="result-title">把耐心，染成了喜欢的样子。</h2><p class="result-desc">每一道纹路都只属于你。作品和这段跟学旅程已经收进手账。</p><button class="modal-primary" id="finishLesson">收进我的手账</button>`);
  $('#modalContent').addEventListener('click', event => { if (event.target.id === 'finishLesson') { closeModal(); $('#courseList').classList.remove('hidden'); $('#lessonView').classList.add('hidden'); navigate('journal'); } });
}
function renderJournal() {
  const visible = entries.filter(entry => activeFilter === '全部' || entry.kind === activeFilter);
  $('#timeline').innerHTML = visible.length ? visible.map(entry => { const item = crafts[entry.craft] || crafts.扎染; return `<div class="timeline-entry" data-entry="${entry.id}"><span class="timeline-thumb" style="background:#dbe7ef url('${item.photo}') center/cover no-repeat"></span><div class="timeline-text"><span class="tag">${entry.kind}</span><strong>${entry.title}</strong><small>${entry.detail}</small></div><span class="timeline-date">${entry.date}</span><button class="entry-more" aria-label="更多">···</button></div>`; }).join('') : '<div class="empty-state">这一类足迹还没有，去发现一门手艺吧。</div>';
  $('#statKinds').textContent = String(new Set(entries.map(entry => entry.craft)).size);
  $('#statWorks').textContent = String(entries.filter(entry => entry.kind === '做了').length);
  $('#statQuestions').textContent = String(entries.filter(entry => entry.kind === '问了').length);
}
function showEntry(id) {
  const entry = entries.find(item => item.id === id);
  if (!entry) return;
  const item = crafts[entry.craft] || crafts.扎染;
  const body = entry.kind === '问了' ? '传承人说：蓝靛染料会随着接触空气逐渐氧化，所以刚从染缸里拿出来时颜色偏绿，晾一会儿就会变成蓝色。' : entry.kind === '做了' ? '跟着步骤完成了手作。手艺需要一点耐心，你已经把它变成了自己的作品。' : item.encyclopedia;
  showModal(`<div class="modal-top"><span>${entry.date} · ${entry.kind}</span><button class="modal-close" aria-label="关闭">×</button></div><div class="detail-photo ${entry.art}" style="background-image:url('${item.photo}')">${entry.symbol}</div><h2 class="result-title">${entry.title.replace(/^(看了|问了|做了) · /, '')}</h2><p class="detail-copy">${body}</p><button class="modal-primary" data-entry-action="${entry.kind === '问了' ? '问答' : entry.kind === '做了' ? '跟学' : '百科'}" data-entry-id="${entry.id}">继续探索</button><button class="delete-link" id="deleteEntry" data-id="${entry.id}">删除这条足迹</button>`);
}
function renderAnswer(question) {
  const text = question.toLowerCase();
  let answer;
  if (/漆|扇|水面/.test(text)) answer = { direct: '漆扇的花纹，是把天然漆滴在水面上，再让扇面轻轻掠过，把水纹带到扇面上。', extra: '漆和水不相溶，会在水面散开形成纹路；每次下扇的角度不同，最后的图案也就不同。', source: '参考：福州脱胎漆器髹饰技艺 · 非遗知识库' };
  else if (/扎|染|蓝|靛/.test(text)) answer = { direct: '扎染的蓝白花纹，来自“先扎后染”：线扎紧的地方染料进不去，拆开后就留下白色。', extra: '蓝靛是一种从植物中提取的染料。布料接触空气后颜色会慢慢变蓝，所以染色时常要反复浸染。', source: '参考：白族扎染技艺 · 非遗知识库' };
  else if (/竹|编/.test(text)) answer = { direct: '竹编要先把竹子剖成粗细均匀的篾条，再一上一下交错编起来。', extra: '“篾”就是把竹子剖开、刮薄后得到的细长竹片。篾条粗细会影响作品的纹样和软硬。', source: '参考：中国竹编技艺 · 非遗知识库' };
  else if (/非遗|手艺|传承|传统/.test(text)) answer = { direct: '非遗，就是一代代人传下来、至今还在生活里使用和实践的文化与手艺。', extra: '它不只是老物件，也包括节庆、表演、技艺和人们一起守护的知识。', source: '参考：联合国教科文组织非遗知识 · mock 摘要' };
  else answer = { direct: '我暂时没找到能可靠回答这个问题的非遗资料。你可以告诉我在哪看到它，或描述一下它的样子和用途。', extra: '补充更多线索后，我会帮你从对应的传统技艺里继续找答案。', source: '当前问题未匹配到可靠资料' };
  return `<div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人 · 直接回答</small><div class="bubble">${answer.direct}<br /><br />${answer.extra}</div><details class="sources"><summary>参考资料 · 1 条</summary><p>${answer.source}</p></details></div></div>`;
}
function sendQuestion(question) {
  const clean = question.trim();
  if (clean.length < 4) { toast('再多说一点点，我更容易帮你找到线索'); return; }
  if (!/非遗|漆|扇|扎染|染|竹编|手艺|传承|技艺|纹样|布料|蓝靛|编织|刺绣|剪纸/.test(clean) && chatTurns === 0) {
    $('#chatMessages').insertAdjacentHTML('beforeend', `<div class="message user"><div class="bubble-wrap"><div class="bubble">${escapeHTML(clean)}</div></div></div><div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人</small><div class="bubble">这个问题好像和非遗手艺没有直接关系。我主要聊传统技艺、节庆和传承故事。可以告诉我你在哪看到的，或者描述一下作品吗？</div></div></div>`);
    return;
  }
  if (chatTurns >= 5) { toast('这一轮已经聊了 5 个问题，开个新对话继续吧'); return; }
  chatTurns += 1;
  const messages = $('#chatMessages');
  messages.querySelector('.suggestions')?.remove();
  messages.insertAdjacentHTML('beforeend', `<div class="message user"><div class="bubble-wrap"><div class="bubble">${escapeHTML(clean)}</div></div></div><div class="typing message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人正在想一想…</small></div></div>`);
  messages.scrollTop = messages.scrollHeight;
  setTimeout(() => {
    messages.querySelector('.typing')?.remove();
    messages.insertAdjacentHTML('beforeend', renderAnswer(clean));
    const prompts = /漆|扇/.test(clean) ? ['每一把漆扇的花纹都不一样吗？', '新手也能试着做一把漆扇吗？'] : ['第一次体验时最容易忽略什么？', '这门手艺还有哪些有趣的变化？'];
    messages.insertAdjacentHTML('beforeend', `<div class="suggestions"><span>接下来还可以问</span>${prompts.map(prompt => `<button class="suggestion">${prompt}</button>`).join('')}</div>`);
    messages.scrollTop = messages.scrollHeight;
    const inferredCraft = /漆|扇/.test(clean) ? '漆扇' : /竹|编/.test(clean) ? '竹编' : '扎染';
    addEntry('问了', inferredCraft, clean.length > 15 ? `${clean.slice(0, 15)}…` : clean, '和传承人聊一门手艺');
  }, 760);
}
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
function shareCard() {
  const kinds = new Set(entries.map(entry => entry.craft)).size;
  const works = entries.filter(entry => entry.kind === '做了').length;
  const questions = entries.filter(entry => entry.kind === '问了').length;
  showModal(`<div class="modal-top"><span>YOUR HERITAGE CARD · 01 / 03</span><button class="modal-close" aria-label="关闭">×</button></div><div class="share-card"><span class="eyebrow">我的非遗手账</span><h2>和手艺相遇的日子</h2><p>每一次好奇，都让老手艺离我更近一点。</p><div class="share-stats"><div><strong>${kinds}</strong><small>解锁门类</small></div><div><strong>${works}</strong><small>完成手作</small></div><div><strong>${questions}</strong><small>问过问题</small></div></div><span class="eyebrow">匠人说 · 让非遗走进日常</span></div><button class="modal-primary" id="copyShare">复制分享文案</button><button class="text-button" id="nextCard" style="width:100%">换一款卡片样式　↻</button>`);
  const card = $('.share-card', $('#modalContent'));
  $('#modalContent').addEventListener('click', async event => {
    if (event.target.id === 'copyShare') {
      const text = `我在匠人说解锁了 ${kinds} 个非遗门类，完成 ${works} 件手作，和传承人聊了 ${questions} 个问题。每一次好奇，都让老手艺离我更近一点。`;
      try { await navigator.clipboard.writeText(text); toast('分享文案已复制'); } catch { toast(text); }
    }
    if (event.target.id === 'nextCard') {
      const looks = ['linear-gradient(145deg,#dcecf0,#f1e5d4)', 'linear-gradient(145deg,#e6e8d9,#d4e7e7)', 'linear-gradient(145deg,#f0dfd2,#e9eee5)'];
      card.style.background = looks[(Number(card.dataset.look || 0) + 1) % looks.length];
      card.dataset.look = String((Number(card.dataset.look || 0) + 1) % looks.length);
      $('.modal-top span', $('#modalContent')).textContent = `YOUR HERITAGE CARD · 0${Number(card.dataset.look) + 1} / 03`;
    }
  });
}

$$('.tab').forEach(button => button.addEventListener('click', () => navigate(button.dataset.tab)));
$$('[data-go]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.go === 'learn') { $('#lessonView').classList.add('hidden'); $('#courseList').classList.remove('hidden'); }
  navigate(button.dataset.go);
}));
$('#cameraBtn').addEventListener('click', showPhotoChoice);
$('#uploadBtn').addEventListener('click', showPhotoChoice);
$('#photoCaptureInput').addEventListener('change', handlePhoto);
$('#photoGalleryInput').addEventListener('change', handlePhoto);
$('#audioMethodBtn').addEventListener('click', showAudioPanel);
$('#audioInput').addEventListener('change', event => { if (event.target.files?.length) identifyAudio(); event.target.value = ''; });
function handlePhoto(event) {
  if (!event.target.files?.length) return;
  const craft = ['漆扇', '扎染', '竹编'][Math.floor(Math.random() * 3)];
  identify(craft, 'photo');
  event.target.value = '';
}
function showPhotoChoice() {
  showModal(`<div class="modal-top"><span>识别方式</span><button class="modal-close" aria-label="关闭">×</button></div><div class="choice-sheet"><div class="sheet-title">用照片认识非遗</div><div class="sheet-sub">选择一张清晰呈现作品主体的照片</div><button class="choice-option" id="choiceCapture"><span class="option-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8.5a2 2 0 0 1 2-2h1.4l1.1-2h7l1.1 2H18a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13.2" r="3"/></svg></span><span class="option-copy"><strong>现场拍照</strong><small>对准身边的非遗作品拍摄</small></span><b>→</b></button><button class="choice-option" id="choiceGallery"><span class="option-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4" width="17" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.6"/><path d="M6 17.5 10.2 13l3 3 2.4-2.3 2.4 2.7"/></svg></span><span class="option-copy"><strong>从相册选择</strong><small>上传图库中的作品照片</small></span><b>→</b></button></div>`);
  $('#modalContent').addEventListener('click', event => {
    if (event.target.id === 'choiceCapture') { closeModal(); setTimeout(() => $('#photoCaptureInput').click(), 60); }
    if (event.target.id === 'choiceGallery') { closeModal(); setTimeout(() => $('#photoGalleryInput').click(), 60); }
  });
}
const audioCrafts = ['侗族大歌', '古琴艺术', '苏州评弹'];
let recorder = null, recorderStream = null, recorderChunks = [], recordingClock = null, recordingSeconds = 0;
function showAudioPanel() {
  showModal(`<div class="modal-top"><span>AUDIO · 用声音认识非遗</span><button class="modal-close" aria-label="关闭">×</button></div><div class="recorder-panel"><div class="record-stage"><span class="record-ring"></span><button class="record-btn" id="recordToggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/></svg><strong>开始录音</strong><small>对准声音来源</small></button></div><div class="wave-bars hidden" id="waveBars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="recorder-timer hidden" id="recordTimer">00:00</div><p class="recorder-hint">录下一段民歌、戏曲或乐器声。尽量保持环境安静，让旋律更清晰。</p><button class="recorder-file" id="audioFileBtn">或从文件选择一段音频</button><div class="recorder-meta">支持 MP3、WAV、M4A · 仅用于本次识别</div></div>`);
  $('#recordToggle').addEventListener('click', toggleRecording);
  $('#audioFileBtn').addEventListener('click', () => $('#audioInput').click());
}
function toggleRecording() {
  const btn = $('#recordToggle');
  if (btn.classList.contains('disabled')) return;
  if (!recorder || recorder.state === 'inactive') {
    startRecording(btn);
  } else {
    stopRecording();
  }
}
async function startRecording(btn) {
  const mic = document.querySelector('.record-btn svg');
  const wave = $('#waveBars'), timer = $('#recordTimer');
  try {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported');
    recorderStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (error) {
    toast('无法访问麦克风，可改用文件上传音频');
    btn.disabled = true; btn.classList.add('disabled'); btn.querySelector('strong').textContent = '麦克风不可用';
    return;
  }
  recorderChunks = [];
  recorder = new MediaRecorder(recorderStream);
  recorder.ondataavailable = event => { if (event.data.size) recorderChunks.push(event.data); };
  recorder.onstop = () => {
    recorderStream.getTracks().forEach(track => track.stop());
    recorder = null;
    btn.classList.remove('recording');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/></svg><strong>再录一次</strong><small>录音已完成</small>';
    clearInterval(recordingClock); recordingSeconds = 0;
    wave.classList.add('hidden'); timer.classList.add('hidden');
    identifyAudio();
  };
  recorder.start();
  recordingSeconds = 0;
  btn.classList.add('recording');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/></svg><strong>停止录音</strong><small>再点一下完成</small>';
  wave.classList.remove('hidden'); timer.classList.remove('hidden');
  recordingClock = setInterval(() => {
    recordingSeconds += 1;
    $('#recordTimer').textContent = String(Math.floor(recordingSeconds / 60)).padStart(2, '0') + ':' + String(recordingSeconds % 60).padStart(2, '0');
  }, 1000);
}
function stopRecording() {
  if (recorder && recorder.state !== 'inactive') recorder.stop();
}
function identifyAudio() {
  clearTimeout(recognitionTimer);
  showModal(`<div class="modal-top"><span>正在辨认声音</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame sound-art">♪</div><p class="demo-copy">匠人正从旋律、唱腔与演奏里寻找线索…</p>`);
  recognitionTimer = setTimeout(() => {
    const name = audioCrafts[Math.floor(Math.random() * audioCrafts.length)];
    resultModal(name, 'audio');
  }, 1100);
}
$$('[data-sample]').forEach(button => button.addEventListener('click', () => identify(button.dataset.sample)));
$$('[data-craft]').forEach(button => button.addEventListener('click', () => { navigate('learn'); startLesson(`${button.dataset.craft}体验`); }));
$$('[data-course]').forEach(button => button.addEventListener('click', () => startLesson(button.dataset.course)));
$('#backCourses').addEventListener('click', () => { $('#lessonView').classList.add('hidden'); $('#courseList').classList.remove('hidden'); });
$('#checkStep').addEventListener('click', mockStepCheck);
$('#stepPhotoInput').addEventListener('change', event => { if (event.target.files?.length) mockStepCheck(); event.target.value = ''; });
$('#lessonVisual').addEventListener('click', () => $('#stepPhotoInput').click());
$('#demoBtn').addEventListener('click', () => showModal(`<div class="modal-top"><span>慢动作演示 · 第 ${currentStep + 1} 步</span><button class="modal-close" aria-label="关闭">×</button></div><div class="demo-frame">${currentCraft === '扎染' ? '✳' : crafts[currentCraft].symbol}</div><p class="demo-copy">先看手势，再跟着自己的节奏试一试。</p><button class="modal-primary modal-close">我知道啦</button>`));
$('#skipStep').addEventListener('click', () => { if (currentStep < lessonSteps.length - 1) { currentStep += 1; updateStep(); } else toast('已经是最后一步啦'); });
$('#sendBtn').addEventListener('click', () => { const input = $('#chatInput'); const value = input.value; input.value = ''; $('#charCount').textContent = '0'; sendQuestion(value); });
$('#chatInput').addEventListener('input', event => { $('#charCount').textContent = String(event.target.value.length); event.target.style.height = 'auto'; event.target.style.height = `${Math.min(event.target.scrollHeight, 100)}px`; });
$('#chatInput').addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); $('#sendBtn').click(); } });
$('#chatMessages').addEventListener('click', event => { const button = event.target.closest('.suggestion'); if (button) sendQuestion(button.textContent); });
$('#newChatBtn').addEventListener('click', () => { chatTurns = 0; $('#chatMessages').innerHTML = '<div class="day-divider">今天 · 新的对话</div><div class="message assistant"><span class="message-avatar">匠</span><div class="bubble-wrap"><small>传承人</small><div class="bubble">我们从一门新手艺开始吧。你最近对什么感到好奇？</div></div></div>'; toast('已经为你开启新的对话'); });
$('#topicBtn').addEventListener('click', () => { const options = ['非遗 · 扎染', '非遗 · 漆扇', '非遗 · 竹编', '非遗 · 随便问']; const current = options.indexOf($('#chatTopic').textContent); $('#chatTopic').textContent = options[(current + 1) % options.length]; toast(`已切换到${$('#chatTopic').textContent}`); });
$('#journalFilters').addEventListener('click', event => { const button = event.target.closest('button[data-filter]'); if (!button) return; activeFilter = button.dataset.filter; $$('#journalFilters button').forEach(item => item.classList.toggle('selected', item === button)); renderJournal(); });
$('#timeline').addEventListener('click', event => { const entry = event.target.closest('.timeline-entry'); if (entry) showEntry(entry.dataset.entry); });
$('#shareBtn').addEventListener('click', shareCard);
let installPromptEvent = null;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPromptEvent = event;
  $('#installBtn').hidden = false;
});
$('#installBtn').addEventListener('click', async () => {
  if (!installPromptEvent) {
    toast('请使用浏览器菜单中的“添加到主屏幕”');
    return;
  }
  installPromptEvent.prompt();
  await installPromptEvent.userChoice;
  installPromptEvent = null;
  $('#installBtn').hidden = true;
});
window.addEventListener('appinstalled', () => {
  $('#installBtn').hidden = true;
  toast('匠人说已添加到主屏幕');
});
$('#nativeShareBtn').addEventListener('click', async () => {
  const shareData = { title: '匠人说 · 非遗生活', text: '来认识身边的非遗手艺，跟着传承人一起体验。', url: location.href };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') toast('分享暂不可用，请复制浏览器地址'); }
    return;
  }
  try {
    await navigator.clipboard.writeText(location.href);
    toast('应用链接已复制，可以发给朋友了');
  } catch {
    toast('复制浏览器地址栏里的链接，分享给朋友');
  }
});
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
$('#modalContent').addEventListener('click', () => {});
$('#modal').addEventListener('click', event => {
  if (event.target === $('#modal') || event.target.closest('.modal-close')) { closeModal(); return; }
  const candidate = event.target.closest('[data-candidate]');
  if (candidate) { const name = candidate.dataset.candidate; resultModal(name); return; }
  if (event.target.id === 'noMatchBtn') { closeModal(); navigate('chat'); $('#chatInput').value = '我看到一件不太确定的手工艺品，能帮我辨认吗？'; $('#charCount').textContent = String($('#chatInput').value.length); return; }
  const action = event.target.closest('[data-result-action]');
  if (action) {
    const label = action.dataset.resultAction;
    const matched = crafts[currentResultCraft] ? currentResultCraft : '漆扇';
    closeModal();
    if (label === '问答') { navigate('chat'); $('#chatTopic').textContent = `非遗 · ${matched}`; $('#chatInput').value = `我想了解${matched}是怎么做出来的？`; $('#charCount').textContent = String($('#chatInput').value.length); }
    else if (label === '跟学') { navigate('learn'); startLesson(`${matched}体验`); }
    else { const item = crafts[matched]; showModal(`<div class="modal-top"><span>CRAFT NOTES · 百科</span><button class="modal-close" aria-label="关闭">×</button></div><div class="detail-photo ${item.art}" style="background-image:url('${item.photo}')">${item.symbol}</div><h2 class="result-title">${item.title}</h2><p class="detail-copy">${item.encyclopedia}</p><div class="result-actions"><button data-result-action="问答">问传承人<small>继续聊聊</small></button><button data-result-action="跟学">我也要试试<small>动手体验</small></button></div>`); }
    return;
  }
  const detailAction = event.target.closest('[data-entry-action]');
  if (detailAction) {
    const label = detailAction.dataset.entryAction;
    const entry = entries.find(item => item.id === detailAction.dataset.entryId);
    const craft = (entry && crafts[entry.craft]) ? entry.craft : '扎染';
    closeModal();
    if (label === '跟学') { navigate('learn'); startLesson(`${craft}体验`); }
    else if (label === '问答') { navigate('chat'); $('#chatTopic').textContent = `非遗 · ${craft}`; $('#chatInput').value = `我想了解${craft}是怎么做出来的？`; $('#charCount').textContent = String($('#chatInput').value.length); }
    else { const item = crafts[craft]; showModal(`<div class="modal-top"><span>CRAFT NOTES · 百科</span><button class="modal-close" aria-label="关闭">×</button></div><div class="detail-photo ${item.art}" style="background-image:url('${item.photo}')">${item.symbol}</div><h2 class="result-title">${item.title}</h2><p class="detail-copy">${item.encyclopedia}</p><div class="result-actions"><button data-result-action="问答">问传承人<small>继续聊聊</small></button><button data-result-action="跟学">我也要试试<small>动手体验</small></button></div>`); }
    return;
  }
  if (event.target.id === 'deleteEntry') {
    const entry = entries.find(item => item.id === event.target.dataset.id);
    entries = entries.filter(item => item.id !== event.target.dataset.id);
    closeModal();
    persist();
    toast(entry?.kind === '做了' ? '足迹已删除，已点亮的徽章会保留' : '这条足迹已删除');
  }
});
renderJournal();
