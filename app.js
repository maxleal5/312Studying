/* ============================================================
   CS312 OS Learning Roadmap – Application Logic
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────
   DATA MODEL
────────────────────────────────────────── */
const TOPICS = [
  {
    id: 'arch',
    num: '1',
    icon: '🖥️',
    title: 'Computer Architecture',
    subtitle: 'CPU, ALU, Control Unit & System Buses',
    tabs: ['Learn', 'Diagram', 'Quiz'],
    learn: `
      <h4>What is Computer Architecture?</h4>
      <p>Computer architecture defines the <strong>logical structure and functional behaviour</strong> of a computing system. It describes how hardware components are organised and how they interact.</p>

      <h4>The CPU</h4>
      <p>The <strong>Central Processing Unit (CPU)</strong> is the brain of the computer. It executes instructions fetched from memory. Every CPU contains three key sub-units:</p>
      <ul>
        <li><strong>Arithmetic Logic Unit (ALU)</strong> – performs all arithmetic operations (add, subtract, multiply…) and logical comparisons (AND, OR, NOT, XOR). The ALU reads operands from registers, performs the operation, and writes results back.</li>
        <li><strong>Control Unit (CU)</strong> – decodes instructions fetched from memory and generates control signals that coordinate the ALU, registers, and memory. It implements the <em>fetch → decode → execute</em> cycle.</li>
        <li><strong>Registers</strong> – tiny, ultra-fast storage locations <em>inside</em> the CPU. Key registers: Program Counter (PC), Instruction Register (IR), Stack Pointer (SP), and general-purpose registers.</li>
      </ul>

      <h4>The Fetch-Decode-Execute Cycle</h4>
      <ol>
        <li><strong>Fetch</strong> – PC holds the address of the next instruction; the CU fetches that instruction from memory into the IR, then increments PC.</li>
        <li><strong>Decode</strong> – The CU interprets the opcode bits in the IR.</li>
        <li><strong>Execute</strong> – The CU activates the appropriate hardware (ALU, memory, I/O) to carry out the instruction.</li>
      </ol>

      <h4>System Buses</h4>
      <p>Buses are shared communication pathways connecting CPU, memory, and I/O devices. There are three types:</p>
      <ul>
        <li><strong>Address Bus</strong> – carries the memory address the CPU wants to access. <em>Unidirectional</em> (CPU → memory). Width determines the maximum addressable memory (32-bit → 4 GB).</li>
        <li><strong>Data Bus</strong> – transfers actual data between CPU, memory, and I/O. <em>Bidirectional</em>. Width (8, 16, 32, 64 bits) determines how much data moves per transfer.</li>
        <li><strong>Control Bus</strong> – carries control signals: read/write, interrupt request, clock, reset, etc. Coordinates bus transactions.</li>
      </ul>

      <div class="info-box tip">💡 <strong>Key Insight:</strong> The width of the address bus determines how much memory the CPU can address. A 64-bit address bus can address 2⁶⁴ ≈ 18.4 exabytes of memory.</div>

      <h4>Clock Speed & Pipelining</h4>
      <p>The CPU is driven by a clock. Each clock tick advances the pipeline stage. Modern CPUs <em>pipeline</em> the fetch-decode-execute cycle so multiple instructions overlap, dramatically increasing throughput.</p>
    `,
    quiz: [
      {
        q: 'Which CPU sub-unit is responsible for performing arithmetic and logic operations?',
        options: ['Control Unit', 'Arithmetic Logic Unit (ALU)', 'Program Counter', 'Cache Controller'],
        answer: 1,
        explanation: 'The ALU performs all arithmetic (add, subtract, etc.) and logical (AND, OR, etc.) operations.'
      },
      {
        q: 'What does the Control Unit primarily do?',
        options: ['Store program data permanently', 'Fetch, decode, and generate signals to execute instructions', 'Manage virtual memory mapping', 'Transfer data over the network'],
        answer: 1,
        explanation: 'The CU implements the fetch-decode-execute cycle by decoding opcodes and generating control signals.'
      },
      {
        q: 'The address bus is typically:',
        options: ['Bidirectional (both CPU and memory can drive it)', 'Unidirectional (CPU sends addresses to memory)', 'Used only for interrupts', 'Part of the ALU'],
        answer: 1,
        explanation: 'The address bus is unidirectional — the CPU places the address it wants to read from or write to, and memory responds.'
      },
      {
        q: 'A CPU with a 32-bit address bus can directly address at most:',
        options: ['2 GB', '4 GB', '8 GB', '16 GB'],
        answer: 1,
        explanation: '2³² = 4,294,967,296 bytes = 4 GB. This is why 32-bit OS systems were limited to ~4 GB RAM.'
      },
      {
        q: 'In the fetch-decode-execute cycle, which register always points to the NEXT instruction to be fetched?',
        options: ['Instruction Register (IR)', 'Stack Pointer (SP)', 'Program Counter (PC)', 'Accumulator'],
        answer: 2,
        explanation: 'The Program Counter (PC) holds the address of the next instruction to fetch. After each fetch, it is automatically incremented.'
      }
    ]
  },

  {
    id: 'memory',
    num: '2',
    icon: '🏗️',
    title: 'Memory Hierarchy',
    subtitle: 'Registers → Cache → RAM → Disk',
    tabs: ['Learn', 'Diagram', 'Quiz'],
    learn: `
      <h4>Why a Hierarchy?</h4>
      <p>Faster memory is more expensive per byte and physically smaller. Slower memory is cheap and abundant. The <strong>memory hierarchy</strong> exploits both by keeping frequently used data in fast, small memory and less-used data in large, slow memory.</p>

      <h4>Levels of the Hierarchy</h4>
      <ul>
        <li><strong>Registers</strong> – inside the CPU, ~1 cycle access, bytes to kilobytes.</li>
        <li><strong>L1 Cache</strong> – on-chip, 2–4 cycles, 32–64 KB per core.</li>
        <li><strong>L2 Cache</strong> – on-chip (or near-chip), 10–15 cycles, 256 KB–1 MB.</li>
        <li><strong>L3 Cache</strong> – shared across cores, 30–50 cycles, 8–64 MB.</li>
        <li><strong>Main Memory (RAM)</strong> – DRAM, 50–100 ns (~200 cycles), gigabytes.</li>
        <li><strong>SSD / NVMe</strong> – 50–100 µs, terabytes.</li>
        <li><strong>HDD</strong> – 5–10 ms, terabytes.</li>
        <li><strong>Optical/Tape</strong> – seconds, vast archives.</li>
      </ul>

      <h4>Locality of Reference</h4>
      <p>Caches work because programs exhibit <em>locality</em>:</p>
      <ul>
        <li><strong>Temporal locality</strong> – a recently used item is likely to be used again soon (loops, variables).</li>
        <li><strong>Spatial locality</strong> – items near a recently used item are likely to be used soon (arrays, sequential code).</li>
      </ul>

      <h4>Cache Hits and Misses</h4>
      <ul>
        <li><strong>Cache hit</strong> – requested data found in cache; served quickly.</li>
        <li><strong>Cache miss</strong> – data not in cache; must be fetched from the next level. A <em>compulsory miss</em> is the first access; a <em>capacity miss</em> occurs when the cache is full; a <em>conflict miss</em> is due to mapping constraints.</li>
      </ul>

      <div class="info-box tip">💡 The average memory access time = hit rate × hit time + miss rate × miss penalty. Even a small increase in hit rate dramatically improves performance.</div>

      <h4>Cache Organisation</h4>
      <p>Caches are divided into <strong>cache lines</strong> (typically 64 bytes). When a miss occurs, the entire cache line is fetched from the next level. Cache mapping can be direct-mapped, set-associative, or fully associative.</p>

      <h4>Write Policies</h4>
      <ul>
        <li><strong>Write-through</strong> – write both to cache and memory immediately. Simple, but slower writes.</li>
        <li><strong>Write-back</strong> – write only to cache; flush to memory when the line is evicted. Faster but more complex (dirty bits).</li>
      </ul>
    `,
    quiz: [
      {
        q: 'Which memory level is the fastest but smallest?',
        options: ['L3 Cache', 'RAM (DRAM)', 'CPU Registers', 'SSD'],
        answer: 2,
        explanation: 'CPU registers are inside the processor and are accessed in a single clock cycle, making them the fastest storage, but they hold only a few bytes.'
      },
      {
        q: 'Temporal locality means:',
        options: ['Data stored near each other is accessed together', 'Recently accessed data is likely to be accessed again soon', 'Disk accesses are grouped in time', 'The CPU clock determines memory speed'],
        answer: 1,
        explanation: 'Temporal locality describes the pattern that recently accessed memory locations tend to be accessed again soon (e.g., variables in a loop).'
      },
      {
        q: 'A cache miss requires fetching data from:',
        options: ['The register file', 'The next lower (slower) level of the hierarchy', 'The GPU', 'The OS kernel'],
        answer: 1,
        explanation: 'On a cache miss, the requested data must be fetched from the next level in the hierarchy (e.g., L2 cache or RAM).'
      },
      {
        q: 'With write-back policy, when is a dirty cache line written to main memory?',
        options: ['Immediately after every write', 'Only when the cache line is evicted', 'Never — the data stays in cache forever', 'On every clock cycle'],
        answer: 1,
        explanation: 'Write-back only flushes the modified cache line to memory when it is evicted from the cache, reducing memory bus traffic.'
      },
      {
        q: 'What is the typical size of a cache line?',
        options: ['4 bytes', '8 bytes', '64 bytes', '4096 bytes'],
        answer: 2,
        explanation: 'Modern CPUs use 64-byte cache lines. When a miss occurs, the entire 64-byte block is fetched to exploit spatial locality.'
      }
    ]
  },

  {
    id: 'vmem',
    num: '3',
    icon: '🗺️',
    title: 'Virtual Memory',
    subtitle: 'Address Spaces, Page Tables & MMU',
    tabs: ['Learn', 'Diagram', 'Quiz'],
    learn: `
      <h4>The Problem Virtual Memory Solves</h4>
      <p>Programs reference memory using <strong>virtual addresses</strong>. Each process gets its own <em>private virtual address space</em>, even though they all share one physical DRAM. Virtual memory provides:</p>
      <ul>
        <li><strong>Isolation</strong> – one process cannot corrupt another's memory.</li>
        <li><strong>Illusion of more RAM</strong> – the OS can store inactive pages on disk.</li>
        <li><strong>Simplified programming</strong> – every process sees memory starting at address 0.</li>
      </ul>

      <h4>Pages and Frames</h4>
      <p>Virtual memory is divided into fixed-size chunks called <strong>pages</strong> (typically 4 KB). Physical memory is divided into equal-size <strong>frames</strong>. The OS maintains a <strong>page table</strong> per process that maps each virtual page number (VPN) to a physical frame number (PFN), plus metadata bits.</p>

      <div class="info-box">📌 <strong>Page Table Entry (PTE) bits:</strong> Valid (V), Dirty (D), Accessed (A), Protection (R/W/X), and the frame number.</div>

      <h4>Address Translation</h4>
      <p>A virtual address is split into two parts:</p>
      <ul>
        <li><strong>Virtual Page Number (VPN)</strong> – upper bits, used to index the page table.</li>
        <li><strong>Page Offset</strong> – lower bits (12 bits for 4 KB pages), copied directly to the physical address.</li>
      </ul>
      <p>Physical Address = Frame Number × Page Size + Page Offset.</p>

      <h4>The MMU (Memory Management Unit)</h4>
      <p>The <strong>MMU</strong> is hardware inside the CPU that performs address translation on <em>every memory access</em> — transparently to software. It:</p>
      <ol>
        <li>Receives the virtual address from the CPU core.</li>
        <li>Walks the page table (or TLB) to find the PFN.</li>
        <li>Constructs the physical address and passes it to the memory bus.</li>
        <li>Raises a <em>page fault</em> exception if the page is not present.</li>
      </ol>

      <h4>The TLB (Translation Lookaside Buffer)</h4>
      <p>Walking the page table on every access is slow (requires memory reads). The <strong>TLB</strong> is a small, fast cache inside the MMU that caches recent VPN→PFN translations. A <strong>TLB hit</strong> gives translation in ~1 cycle; a <strong>TLB miss</strong> triggers a page-table walk (hardware or software).</p>

      <div class="info-box tip">💡 Modern CPUs have separate L1 TLBs for instructions and data, plus a shared L2 TLB. Typical TLB size: 64–1024 entries.</div>

      <h4>Multi-level Page Tables</h4>
      <p>A flat page table for a 64-bit address space would require terabytes of memory. Multi-level page tables (2, 3, or 4 levels in x86-64) solve this by only allocating page-table pages for address ranges that are actually used.</p>
    `,
    quiz: [
      {
        q: 'Virtual memory provides process isolation by:',
        options: ['Encrypting each process\'s memory', 'Giving each process its own virtual address space mapped independently', 'Running each process on a separate physical CPU', 'Storing each process on a separate disk partition'],
        answer: 1,
        explanation: 'Each process has its own page table, so virtual address 0x1000 in process A maps to a different physical frame than in process B — preventing accidental or malicious access.'
      },
      {
        q: 'For a 4 KB page, how many bits are used for the page offset in a virtual address?',
        options: ['8 bits', '10 bits', '12 bits', '16 bits'],
        answer: 2,
        explanation: '4 KB = 2¹² bytes, so 12 bits are needed to address every byte within a page. The remaining upper bits form the VPN.'
      },
      {
        q: 'What hardware component performs virtual-to-physical address translation?',
        options: ['Cache Controller', 'Memory Management Unit (MMU)', 'Control Unit', 'DMA Controller'],
        answer: 1,
        explanation: 'The MMU is dedicated hardware inside or closely coupled to the CPU that translates every virtual address to a physical address using the page table.'
      },
      {
        q: 'A TLB (Translation Lookaside Buffer) is best described as:',
        options: ['A backup copy of physical RAM', 'A cache for recent virtual-to-physical address translations', 'A queue for pending disk I/O requests', 'The OS data structure that stores all page tables'],
        answer: 1,
        explanation: 'The TLB caches recently used page table entries so the MMU can avoid a full page-table walk (multiple memory accesses) on every translation.'
      },
      {
        q: 'Why are multi-level page tables used in 64-bit systems?',
        options: ['They are faster than single-level tables', 'A single flat table would need petabytes of memory to cover the full address space', 'They remove the need for the TLB', 'The hardware only supports 4 levels'],
        answer: 1,
        explanation: 'A flat page table for a 48-bit virtual address space (common in x86-64) with 4 KB pages would need 2³⁶ entries × 8 bytes = 512 GB per process!'
      }
    ]
  },

  {
    id: 'pagefault',
    num: '4',
    icon: '⚡',
    title: 'Page Faults',
    subtitle: 'Detection, Handling & Disk Swap',
    tabs: ['Learn', 'Diagram', 'Quiz'],
    learn: `
      <h4>What Is a Page Fault?</h4>
      <p>A <strong>page fault</strong> is a hardware exception raised by the MMU when a program accesses a virtual page that is <em>not currently loaded in physical memory</em>. The <strong>valid bit</strong> in the page table entry is 0, triggering a trap to the OS.</p>

      <h4>Types of Page Faults</h4>
      <ul>
        <li><strong>Minor (soft) fault</strong> – the page exists in memory but is not mapped (e.g., copy-on-write pages, shared memory). Resolved quickly without disk I/O.</li>
        <li><strong>Major (hard) fault</strong> – the page must be read from disk (swap space). Expensive (~10 ms for HDD, ~100 µs for SSD).</li>
        <li><strong>Invalid fault (segfault)</strong> – the address is not in the process's valid address space → OS kills the process with SIGSEGV.</li>
      </ul>

      <h4>Page Fault Handling Steps</h4>
      <ol>
        <li><strong>MMU raises trap</strong> – CPU saves the faulting address in the CR2 register (x86) and jumps to the OS page-fault handler.</li>
        <li><strong>OS checks validity</strong> – is the address within a valid VMA (Virtual Memory Area)? If not → segfault.</li>
        <li><strong>Find a free frame</strong> – if RAM is full, a <em>page replacement algorithm</em> selects a victim page to evict.</li>
        <li><strong>Evict victim (if needed)</strong> – if the victim frame is dirty, write it to swap space on disk.</li>
        <li><strong>Load the faulting page</strong> – read the required page from disk into the freed frame.</li>
        <li><strong>Update page table</strong> – set the valid bit and write the new frame number into the PTE.</li>
        <li><strong>Resume process</strong> – the OS restarts the faulting instruction; the MMU now finds the page present.</li>
      </ol>

      <div class="info-box warn">⚠️ <strong>Thrashing</strong> occurs when the system spends more time handling page faults than doing useful work. This happens when the total working set of all processes exceeds available RAM. The OS uses the working-set model and swap to mitigate thrashing.</div>

      <h4>Swap Space</h4>
      <p>The OS reserves a region on disk called <strong>swap space</strong> (or a swap file on Windows). Evicted pages are stored here. When a process needs a swapped-out page, a major page fault occurs and the OS reads it back. Modern systems (Linux) use the <em>swappiness</em> parameter to control aggressiveness of swapping.</p>

      <h4>Demand Paging</h4>
      <p>A key optimization: the OS does <em>not</em> load all pages when a process starts. Pages are loaded <strong>on demand</strong> — only when they are first accessed. This speeds up process startup and conserves memory.</p>
    `,
    quiz: [
      {
        q: 'A page fault is triggered when:',
        options: ['The CPU executes an illegal instruction', 'A process accesses a virtual page that is not currently in physical memory', 'The disk is full', 'A process requests more than 4 GB of memory'],
        answer: 1,
        explanation: 'The MMU checks the valid bit of the page table entry. If it is 0, the page is not in RAM and the hardware raises a page fault exception.'
      },
      {
        q: 'What distinguishes a major page fault from a minor page fault?',
        options: ['A major fault crashes the program', 'A major fault requires reading the page from disk (disk I/O)', 'A minor fault is caused by illegal memory access', 'A minor fault requires kernel mode switching'],
        answer: 1,
        explanation: 'A major (hard) fault requires disk I/O to bring the page in from swap space, which is orders of magnitude slower than a minor fault.'
      },
      {
        q: 'What is "demand paging"?',
        options: ['Loading all program pages into memory at startup', 'Loading pages into memory only when they are first accessed', 'Pre-fetching pages before they are needed', 'Keeping all pages on disk until the program exits'],
        answer: 1,
        explanation: 'Demand paging defers loading pages until they are actually accessed, reducing startup time and memory usage for rarely-accessed code paths.'
      },
      {
        q: 'On x86, which register contains the virtual address that caused a page fault?',
        options: ['CR0', 'CR2', 'CR3', 'CR4'],
        answer: 1,
        explanation: 'CR2 is the Page Fault Linear Address register — it automatically holds the address that caused the page fault when the exception occurs.'
      },
      {
        q: '"Thrashing" in virtual memory context means:',
        options: ['The disk head is moving rapidly', 'The CPU is spending more time servicing page faults than executing useful instructions', 'A process has too many threads', 'The TLB is too small'],
        answer: 1,
        explanation: 'Thrashing occurs when the total working sets exceed RAM, causing constant page faults and disk I/O, grinding performance to a halt.'
      }
    ]
  },

  {
    id: 'replacement',
    num: '5',
    icon: '🔄',
    title: 'Page Replacement Algorithms',
    subtitle: 'FIFO, LRU, Optimal — Interactive Simulator',
    tabs: ['Learn', 'Diagram', 'Simulator', 'Quiz'],
    learn: `
      <h4>Why Replacement Algorithms Matter</h4>
      <p>When physical memory is full and a new page must be loaded, the OS must <strong>evict</strong> an existing page. The choice of <em>which page to evict</em> greatly affects performance (number of page faults). The <strong>optimal algorithm</strong> gives the theoretical lower bound on faults.</p>

      <h4>FIFO – First In, First Out</h4>
      <p>Evict the page that has been in memory the <em>longest</em>. Simple to implement with a queue, but ignores how frequently or recently a page has been used.</p>
      <div class="info-box warn">⚠️ <strong>Bélády's Anomaly</strong>: For FIFO, adding more frames can sometimes <em>increase</em> the number of page faults — a counter-intuitive result!</div>

      <h4>LRU – Least Recently Used</h4>
      <p>Evict the page that was <em>least recently accessed</em>. Exploits temporal locality — recently used pages are likely to be used again. LRU does not suffer from Bélády's Anomaly.</p>
      <p>Implementation challenges: exact LRU requires tracking access order for every memory reference, which is expensive. Approximations like the <strong>clock algorithm</strong> (second-chance) are used in real OSes (Linux uses a modified clock algorithm).</p>

      <h4>Optimal (Bélády's Algorithm)</h4>
      <p>Evict the page that will <em>not be used for the longest time in the future</em>. This is theoretically optimal — it minimises page faults — but it is <strong>not implementable</strong> in practice because you cannot know future accesses. It is used as a benchmark.</p>

      <h4>Comparison</h4>
      <ul>
        <li><strong>OPT</strong> – minimum faults, not implementable.</li>
        <li><strong>LRU</strong> – near-optimal, higher implementation cost.</li>
        <li><strong>FIFO</strong> – simple, worst performance, suffers Bélády's Anomaly.</li>
      </ul>

      <div class="info-box tip">💡 Use the <strong>Simulator tab</strong> to see all three algorithms step-by-step on a custom reference string! The default uses the classic Tanenbaum example: <code>7 0 1 2 0 3 0 4 2 3 0 3</code> with 3 frames → FIFO=10F, LRU=9F, OPT=7F.</div>
    `,
    quiz: [
      {
        q: 'FIFO page replacement evicts the page that:',
        options: ['Was accessed least recently', 'Has been in memory the longest', 'Will not be used for the longest future time', 'Has the smallest page number'],
        answer: 1,
        explanation: 'FIFO evicts the oldest page in memory (the one that was loaded earliest), regardless of how frequently it has been used.'
      },
      {
        q: 'Bélády\'s Anomaly states that for FIFO:',
        options: ['More frames always means fewer page faults', 'Adding more frames can sometimes increase page faults', 'LRU and FIFO always produce the same fault count', 'The optimal algorithm is always FIFO with enough frames'],
        answer: 1,
        explanation: 'Bélády\'s Anomaly is the surprising property of FIFO where increasing the number of frames can lead to MORE page faults for certain reference strings.'
      },
      {
        q: 'The Optimal (OPT) replacement algorithm evicts the page that:',
        options: ['Was loaded first (oldest)', 'Was used least recently', 'Will not be used for the longest time in the future', 'Has the most references in the past'],
        answer: 2,
        explanation: 'OPT evicts the page whose next use is furthest in the future (or will never be used). This minimises faults but requires clairvoyance of future accesses.'
      },
      {
        q: 'Why is the Optimal algorithm not used in practice?',
        options: ['It produces too many page faults', 'It requires knowing future memory reference patterns, which is impossible', 'It only works with 4 KB pages', 'It requires hardware support not available on x86'],
        answer: 1,
        explanation: 'OPT needs to know which page will be accessed farthest in the future, which requires foreknowledge of all future memory references — impossible in a real system.'
      },
      {
        q: 'Linux\'s page replacement algorithm is based on:',
        options: ['Pure FIFO', 'Pure LRU', 'A modified clock (second-chance) algorithm approximating LRU', 'The Optimal algorithm with pre-fetching'],
        answer: 2,
        explanation: 'Real OSes like Linux use a clock/second-chance algorithm that approximates LRU cheaply using reference bits set by the MMU hardware.'
      }
    ]
  }
];

/* ──────────────────────────────────────────
   STATE
────────────────────────────────────────── */
const state = {
  completed: new Set(),
  quizScores: {},      // topicId → { score, total }
};

/* ──────────────────────────────────────────
   SVG DIAGRAMS
────────────────────────────────────────── */
const DIAGRAMS = {
  arch: `
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" style="font-family:monospace;font-size:13px">
  <!-- CPU Box -->
  <rect x="220" y="30" width="280" height="200" rx="14" fill="#21253a" stroke="#6c8efb" stroke-width="2"/>
  <text x="360" y="52" text-anchor="middle" fill="#6c8efb" font-weight="bold" font-size="14">CPU</text>

  <!-- CU -->
  <rect x="240" y="65" width="110" height="60" rx="8" fill="#12152a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="295" y="90" text-anchor="middle" fill="#a78bfa" font-weight="bold">Control</text>
  <text x="295" y="106" text-anchor="middle" fill="#a78bfa" font-weight="bold">Unit</text>

  <!-- ALU -->
  <rect x="370" y="65" width="110" height="60" rx="8" fill="#12152a" stroke="#34d399" stroke-width="1.5"/>
  <text x="425" y="90" text-anchor="middle" fill="#34d399" font-weight="bold">ALU</text>
  <text x="425" y="106" text-anchor="middle" fill="#34d399" font-size="11">+  −  AND  OR</text>

  <!-- Registers -->
  <rect x="240" y="145" width="240" height="55" rx="8" fill="#12152a" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="360" y="168" text-anchor="middle" fill="#fbbf24" font-weight="bold">Registers</text>
  <text x="360" y="186" text-anchor="middle" fill="#94a3b8" font-size="11">PC  IR  SP  AX  BX  CX  DX</text>

  <!-- Memory Box -->
  <rect x="30" y="80" width="140" height="80" rx="10" fill="#21253a" stroke="#6c8efb" stroke-width="1.5"/>
  <text x="100" y="106" text-anchor="middle" fill="#e2e8f0" font-weight="bold">Main Memory</text>
  <text x="100" y="124" text-anchor="middle" fill="#94a3b8" font-size="11">(RAM / DRAM)</text>
  <text x="100" y="142" text-anchor="middle" fill="#94a3b8" font-size="11">Addresses + Data</text>

  <!-- I/O Box -->
  <rect x="550" y="80" width="140" height="80" rx="10" fill="#21253a" stroke="#6c8efb" stroke-width="1.5"/>
  <text x="620" y="106" text-anchor="middle" fill="#e2e8f0" font-weight="bold">I/O Devices</text>
  <text x="620" y="124" text-anchor="middle" fill="#94a3b8" font-size="11">Disk · NIC · USB</text>
  <text x="620" y="142" text-anchor="middle" fill="#94a3b8" font-size="11">Display · Keyboard</text>

  <!-- Address Bus -->
  <line x1="170" y1="295" x2="550" y2="295" stroke="#f87171" stroke-width="2.5"/>
  <text x="360" y="286" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">Address Bus  (unidirectional →)</text>
  <polygon points="550,291 560,295 550,299" fill="#f87171"/>

  <!-- Data Bus -->
  <line x1="170" y1="315" x2="550" y2="315" stroke="#6c8efb" stroke-width="2.5"/>
  <text x="360" y="333" text-anchor="middle" fill="#6c8efb" font-size="11" font-weight="bold">Data Bus  (bidirectional ↔)</text>
  <polygon points="170,311 160,315 170,319" fill="#6c8efb"/>
  <polygon points="550,311 560,315 550,319" fill="#6c8efb"/>

  <!-- Control Bus -->
  <line x1="170" y1="355" x2="550" y2="355" stroke="#34d399" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="360" y="349" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">Control Bus  (read/write/IRQ/clock)</text>

  <!-- CPU to bus connectors -->
  <line x1="360" y1="230" x2="360" y2="285" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Memory to bus -->
  <line x1="100" y1="160" x2="100" y2="285" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="100" y1="295" x2="170" y2="295" stroke="#f87171" stroke-width="2.5"/>
  <line x1="100" y1="315" x2="170" y2="315" stroke="#6c8efb" stroke-width="2.5"/>
  <!-- IO to bus -->
  <line x1="620" y1="160" x2="620" y2="285" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="550" y1="295" x2="620" y2="295" stroke="#f87171" stroke-width="2.5"/>
  <line x1="550" y1="315" x2="620" y2="315" stroke="#6c8efb" stroke-width="2.5"/>
</svg>`,

  memory: `
<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style="font-family:monospace;font-size:12px">
  <!-- Pyramid layers, top = fastest -->
  <!-- Registers -->
  <polygon points="300,20 240,65 360,65" fill="#6c8efb" opacity="0.9"/>
  <text x="300" y="52" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">Registers</text>

  <!-- L1 Cache -->
  <polygon points="240,70 195,115 405,115 360,70" fill="#a78bfa" opacity="0.85"/>
  <text x="300" y="98" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">L1 Cache</text>

  <!-- L2 Cache -->
  <polygon points="195,120 155,165 445,165 405,120" fill="#818cf8" opacity="0.85"/>
  <text x="300" y="148" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">L2 Cache</text>

  <!-- L3 Cache -->
  <polygon points="155,170 115,215 485,215 445,170" fill="#6366f1" opacity="0.85"/>
  <text x="300" y="198" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">L3 Cache</text>

  <!-- RAM -->
  <polygon points="115,220 75,265 525,265 485,220" fill="#34d399" opacity="0.8"/>
  <text x="300" y="248" text-anchor="middle" fill="#0f1117" font-weight="bold" font-size="11">Main Memory (RAM)</text>

  <!-- Disk -->
  <polygon points="75,270 30,315 570,315 525,270" fill="#fbbf24" opacity="0.75"/>
  <text x="300" y="298" text-anchor="middle" fill="#0f1117" font-weight="bold" font-size="11">Storage (SSD / HDD)</text>

  <!-- Right-side labels -->
  <text x="378" y="52" fill="#94a3b8" font-size="10">1 cycle  |  bytes</text>
  <text x="420" y="98" fill="#94a3b8" font-size="10">2-4 cy  |  32-64 KB</text>
  <text x="455" y="148" fill="#94a3b8" font-size="10">10-15 cy  |  256KB-1MB</text>
  <text x="495" y="198" fill="#94a3b8" font-size="10">30-50 cy  |  8-64 MB</text>
  <text x="535" y="248" fill="#94a3b8" font-size="10">~200 cy  |  GBs</text>
  <text x="578" y="298" fill="#94a3b8" font-size="10">ms-µs  |  TBs</text>

  <!-- Left-side labels -->
  <text x="10" y="52" fill="#6c8efb" font-size="10" text-anchor="start">↑ Fastest</text>
  <text x="10" y="298" fill="#fbbf24" font-size="10" text-anchor="start">↓ Largest</text>
</svg>`,

  vmem: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="font-family:monospace;font-size:12px">
  <!-- Virtual Address Space -->
  <rect x="20" y="30" width="130" height="240" rx="8" fill="#21253a" stroke="#6c8efb" stroke-width="1.5"/>
  <text x="85" y="22" text-anchor="middle" fill="#6c8efb" font-weight="bold" font-size="12">Virtual Address</text>
  <rect x="30" y="40" width="110" height="32" rx="4" fill="#12152a" stroke="#a78bfa" stroke-width="1"/>
  <text x="85" y="58" text-anchor="middle" fill="#a78bfa" font-size="11">VPN=0 | Code</text>
  <rect x="30" y="80" width="110" height="32" rx="4" fill="#12152a" stroke="#6c8efb" stroke-width="1"/>
  <text x="85" y="98" text-anchor="middle" fill="#6c8efb" font-size="11">VPN=1 | Heap</text>
  <rect x="30" y="120" width="110" height="32" rx="4" fill="#12152a" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="85" y="138" text-anchor="middle" fill="#94a3b8" font-size="11">VPN=2 | (not mapped)</text>
  <rect x="30" y="160" width="110" height="32" rx="4" fill="#12152a" stroke="#34d399" stroke-width="1"/>
  <text x="85" y="178" text-anchor="middle" fill="#34d399" font-size="11">VPN=3 | Stack</text>
  <rect x="30" y="200" width="110" height="32" rx="4" fill="#12152a" stroke="#fbbf24" stroke-width="1"/>
  <text x="85" y="218" text-anchor="middle" fill="#fbbf24" font-size="11">VPN=4 | Kernel</text>
  <text x="85" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">Virtual Pages</text>

  <!-- Page Table -->
  <rect x="270" y="30" width="160" height="220" rx="8" fill="#21253a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="350" y="22" text-anchor="middle" fill="#a78bfa" font-weight="bold" font-size="12">Page Table</text>
  <text x="350" y="50" text-anchor="middle" fill="#94a3b8" font-size="10">VPN  →  PFN  V  D</text>
  <line x1="270" y1="55" x2="430" y2="55" stroke="#2e3354" stroke-width="1"/>
  <text x="350" y="75" text-anchor="middle" fill="#a78bfa" font-size="11">0  →  PF 3  ✓</text>
  <text x="350" y="100" text-anchor="middle" fill="#6c8efb" font-size="11">1  →  PF 7  ✓</text>
  <text x="350" y="125" text-anchor="middle" fill="#94a3b8" font-size="11">2  →  —   ✗  (fault)</text>
  <text x="350" y="150" text-anchor="middle" fill="#34d399" font-size="11">3  →  PF 1  ✓</text>
  <text x="350" y="175" text-anchor="middle" fill="#fbbf24" font-size="11">4  →  PF 5  ✓</text>
  <text x="350" y="210" text-anchor="middle" fill="#94a3b8" font-size="10">Managed by OS/MMU</text>
  <text x="350" y="228" text-anchor="middle" fill="#94a3b8" font-size="10">CR3 → page table base</text>

  <!-- MMU -->
  <rect x="205" y="115" width="60" height="40" rx="8" fill="#6c8efb" opacity="0.15" stroke="#6c8efb" stroke-width="1.5"/>
  <text x="235" y="132" text-anchor="middle" fill="#6c8efb" font-weight="bold" font-size="11">MMU</text>
  <text x="235" y="148" text-anchor="middle" fill="#6c8efb" font-size="10">+TLB</text>

  <!-- Physical Memory -->
  <rect x="550" y="30" width="130" height="240" rx="8" fill="#21253a" stroke="#34d399" stroke-width="1.5"/>
  <text x="615" y="22" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="12">Physical Memory</text>
  <rect x="560" y="40" width="110" height="32" rx="4" fill="#12152a" stroke="#34d399" stroke-width="1"/>
  <text x="615" y="58" text-anchor="middle" fill="#34d399" font-size="11">PF 1 | Stack data</text>
  <rect x="560" y="80" width="110" height="32" rx="4" fill="#12152a" stroke="#94a3b8" stroke-width="1"/>
  <text x="615" y="98" text-anchor="middle" fill="#94a3b8" font-size="11">PF 2 | (free)</text>
  <rect x="560" y="120" width="110" height="32" rx="4" fill="#12152a" stroke="#a78bfa" stroke-width="1"/>
  <text x="615" y="138" text-anchor="middle" fill="#a78bfa" font-size="11">PF 3 | Code</text>
  <rect x="560" y="160" width="110" height="32" rx="4" fill="#12152a" stroke="#94a3b8" stroke-width="1"/>
  <text x="615" y="178" text-anchor="middle" fill="#94a3b8" font-size="11">PF 4 | (free)</text>
  <rect x="560" y="200" width="110" height="32" rx="4" fill="#12152a" stroke="#fbbf24" stroke-width="1"/>
  <text x="615" y="218" text-anchor="middle" fill="#fbbf24" font-size="11">PF 5 | Kernel</text>
  <text x="615" y="258" text-anchor="middle" fill="#94a3b8" font-size="10">Physical Frames</text>

  <!-- Arrows: VPN -> MMU -> PTE -> Physical -->
  <line x1="140" y1="56" x2="205" y2="133" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="140" y1="96" x2="205" y2="133" stroke="#6c8efb" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="140" y1="176" x2="205" y2="133" stroke="#34d399" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="265" y1="133" x2="270" y2="133" stroke="#6c8efb" stroke-width="1.5"/>

  <line x1="430" y1="75" x2="550" y2="137" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="430" y1="100" x2="550" y2="90" stroke="#6c8efb" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="430" y1="150" x2="550" y2="56" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="430" y1="175" x2="550" y2="216" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
</svg>`,

  pagefault: `
<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" style="font-family:monospace;font-size:12px">
  <!-- Process -->
  <rect x="290" y="10" width="100" height="40" rx="8" fill="#6c8efb" opacity="0.2" stroke="#6c8efb" stroke-width="1.5"/>
  <text x="340" y="30" text-anchor="middle" fill="#6c8efb" font-weight="bold">Process</text>
  <text x="340" y="44" text-anchor="middle" fill="#6c8efb" font-size="10">accesses addr</text>

  <!-- Arrow down -->
  <line x1="340" y1="50" x2="340" y2="75" stroke="#94a3b8" stroke-width="1.5"/>
  <polygon points="335,72 340,82 345,72" fill="#94a3b8"/>

  <!-- MMU check -->
  <rect x="280" y="82" width="120" height="40" rx="8" fill="#21253a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="340" y="100" text-anchor="middle" fill="#a78bfa" font-weight="bold">MMU Check</text>
  <text x="340" y="114" text-anchor="middle" fill="#94a3b8" font-size="10">Valid bit = 0?</text>

  <!-- Diamond decision -->
  <polygon points="340,138 290,170 340,202 390,170" fill="#21253a" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="340" y="168" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-size="11">Page</text>
  <text x="340" y="182" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-size="11">Present?</text>

  <!-- Yes path -->
  <line x1="390" y1="170" x2="510" y2="170" stroke="#34d399" stroke-width="1.5"/>
  <polygon points="507,165 517,170 507,175" fill="#34d399"/>
  <text x="450" y="162" text-anchor="middle" fill="#34d399" font-size="10">YES</text>
  <rect x="517" y="150" width="110" height="40" rx="8" fill="#21253a" stroke="#34d399" stroke-width="1.5"/>
  <text x="572" y="168" text-anchor="middle" fill="#34d399" font-weight="bold">Translate OK</text>
  <text x="572" y="182" text-anchor="middle" fill="#94a3b8" font-size="10">PFN from PTE</text>

  <!-- No path -->
  <line x1="340" y1="202" x2="340" y2="235" stroke="#f87171" stroke-width="1.5"/>
  <polygon points="335,232 340,242 345,232" fill="#f87171"/>
  <text x="358" y="222" fill="#f87171" font-size="10">NO</text>

  <!-- OS Fault Handler -->
  <rect x="255" y="242" width="170" height="40" rx="8" fill="#21253a" stroke="#f87171" stroke-width="1.5"/>
  <text x="340" y="260" text-anchor="middle" fill="#f87171" font-weight="bold">OS Fault Handler</text>
  <text x="340" y="274" text-anchor="middle" fill="#94a3b8" font-size="10">Trap to kernel</text>

  <line x1="340" y1="282" x2="340" y2="305" stroke="#94a3b8" stroke-width="1.5"/>
  <polygon points="335,302 340,312 345,302" fill="#94a3b8"/>

  <!-- Find/evict frame -->
  <rect x="240" y="312" width="200" height="40" rx="8" fill="#21253a" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="340" y="330" text-anchor="middle" fill="#fbbf24" font-weight="bold">Find Free Frame</text>
  <text x="340" y="344" text-anchor="middle" fill="#94a3b8" font-size="10">evict victim if RAM full</text>

  <line x1="340" y1="352" x2="340" y2="372" stroke="#94a3b8" stroke-width="1.5"/>
  <polygon points="335,369 340,379 345,369" fill="#94a3b8"/>

  <!-- Load from disk -->
  <rect x="240" y="379" width="200" height="18" rx="5" fill="#6c8efb" opacity="0.15" stroke="#6c8efb" stroke-width="1.2"/>
  <text x="340" y="391" text-anchor="middle" fill="#6c8efb" font-size="10">Read page from disk → update PTE → resume</text>

  <!-- Disk icon -->
  <rect x="30" y="312" width="80" height="40" rx="8" fill="#21253a" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="70" y="330" text-anchor="middle" fill="#94a3b8">💾</text>
  <text x="70" y="347" text-anchor="middle" fill="#94a3b8" font-size="10">Swap Disk</text>
  <line x1="240" y1="332" x2="110" y2="332" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="113,327 103,332 113,337" fill="#94a3b8"/>

  <!-- MMU to diamond -->
  <line x1="340" y1="122" x2="340" y2="138" stroke="#94a3b8" stroke-width="1.5"/>
  <polygon points="335,135 340,142 345,135" fill="#94a3b8"/>
</svg>`,

  replacement: `
<svg viewBox="0 0 730 285" xmlns="http://www.w3.org/2000/svg" style="font-family:monospace;font-size:11.5px">
  <!-- Title -->
  <text x="365" y="18" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="13">Reference String: 7 0 1 2 0 3 0 4 2 3 0 3  |  Frames = 3</text>

  <!-- Step column headers -->
  <text x="35"  y="35" text-anchor="middle" fill="#94a3b8" font-size="10">Pg</text>
  <text x="95"  y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">7</text>
  <text x="148" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">0</text>
  <text x="201" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">1</text>
  <text x="254" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">2</text>
  <text x="307" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">0</text>
  <text x="360" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">3</text>
  <text x="413" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">0</text>
  <text x="466" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">4</text>
  <text x="519" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">2</text>
  <text x="572" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">3</text>
  <text x="625" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">0</text>
  <text x="678" y="35" text-anchor="middle" fill="#e2e8f0" font-weight="bold" font-size="11">3</text>
  <text x="715" y="35" text-anchor="middle" fill="#94a3b8" font-size="10">Tot</text>

  <!-- Horizontal divider -->
  <line x1="60" y1="41" x2="730" y2="41" stroke="#2e3354" stroke-width="1"/>

  <!-- ── FIFO row ── -->
  <text x="35" y="65" text-anchor="middle" fill="#f87171" font-weight="bold" font-size="12">FIFO</text>
  <!-- F F F F H F F F F F F H = 10 faults -->
  <text x="95"  y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="95"  y="75" text-anchor="middle" fill="#94a3b8" font-size="9">{7}</text>
  <text x="148" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="148" y="75" text-anchor="middle" fill="#94a3b8" font-size="9">{7,0}</text>
  <text x="201" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="201" y="75" text-anchor="middle" fill="#94a3b8" font-size="9">{7,0,1}</text>
  <text x="254" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="254" y="75" text-anchor="middle" fill="#fbbf24" font-size="9">-7→{0,1,2}</text>
  <text x="307" y="62" text-anchor="middle" fill="#34d399">H</text>
  <text x="307" y="75" text-anchor="middle" fill="#94a3b8" font-size="9">{0,1,2}</text>
  <text x="360" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="360" y="75" text-anchor="middle" fill="#fbbf24" font-size="9">-0→{1,2,3}</text>
  <text x="413" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="413" y="75" text-anchor="middle" fill="#fbbf24" font-size="9">-1→{2,3,0}</text>
  <text x="466" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="466" y="75" text-anchor="middle" fill="#fbbf24" font-size="9">-2→{3,0,4}</text>
  <text x="519" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="519" y="75" text-anchor="middle" fill="#fbbf24" font-size="9">-3→{0,4,2}</text>
  <text x="572" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="572" y="75" text-anchor="middle" fill="#fbbf24" font-size="9">-0→{4,2,3}</text>
  <text x="625" y="62" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="625" y="75" text-anchor="middle" fill="#fbbf24" font-size="9">-4→{2,3,0}</text>
  <text x="678" y="62" text-anchor="middle" fill="#34d399">H</text>
  <text x="678" y="75" text-anchor="middle" fill="#94a3b8" font-size="9">{2,3,0}</text>
  <text x="715" y="68" text-anchor="middle" fill="#f87171" font-weight="bold" font-size="12">10F</text>

  <!-- Horizontal divider -->
  <line x1="60" y1="83" x2="730" y2="83" stroke="#2e3354" stroke-width="1"/>

  <!-- ── LRU row ── -->
  <text x="35" y="107" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-size="12">LRU</text>
  <!-- F F F F H F H F F F F H = 9 faults -->
  <text x="95"  y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="95"  y="117" text-anchor="middle" fill="#94a3b8" font-size="9">{7}</text>
  <text x="148" y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="148" y="117" text-anchor="middle" fill="#94a3b8" font-size="9">{7,0}</text>
  <text x="201" y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="201" y="117" text-anchor="middle" fill="#94a3b8" font-size="9">{7,0,1}</text>
  <text x="254" y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="254" y="117" text-anchor="middle" fill="#fbbf24" font-size="9">-7→{0,1,2}</text>
  <text x="307" y="104" text-anchor="middle" fill="#34d399">H</text>
  <text x="307" y="117" text-anchor="middle" fill="#94a3b8" font-size="9">{1,2,0}</text>
  <text x="360" y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="360" y="117" text-anchor="middle" fill="#fbbf24" font-size="9">-1→{2,0,3}</text>
  <text x="413" y="104" text-anchor="middle" fill="#34d399">H</text>
  <text x="413" y="117" text-anchor="middle" fill="#94a3b8" font-size="9">{2,3,0}</text>
  <text x="466" y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="466" y="117" text-anchor="middle" fill="#fbbf24" font-size="9">-2→{3,0,4}</text>
  <text x="519" y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="519" y="117" text-anchor="middle" fill="#fbbf24" font-size="9">-3→{0,4,2}</text>
  <text x="572" y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="572" y="117" text-anchor="middle" fill="#fbbf24" font-size="9">-0→{4,2,3}</text>
  <text x="625" y="104" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="625" y="117" text-anchor="middle" fill="#fbbf24" font-size="9">-4→{2,3,0}</text>
  <text x="678" y="104" text-anchor="middle" fill="#34d399">H</text>
  <text x="678" y="117" text-anchor="middle" fill="#94a3b8" font-size="9">{2,0,3}</text>
  <text x="715" y="110" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-size="12">9F</text>

  <!-- Highlight: LRU hit at step 7 vs FIFO fault -->
  <rect x="395" y="85" width="36" height="32" rx="4" fill="rgba(52,211,153,.08)" stroke="#34d399" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Horizontal divider -->
  <line x1="60" y1="126" x2="730" y2="126" stroke="#2e3354" stroke-width="1"/>

  <!-- ── OPT row ── -->
  <text x="35" y="150" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="12">OPT</text>
  <!-- F F F F H F H F H H F H = 7 faults -->
  <text x="95"  y="147" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="95"  y="160" text-anchor="middle" fill="#94a3b8" font-size="9">{7}</text>
  <text x="148" y="147" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="148" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">{7,0}</text>
  <text x="201" y="147" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="201" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">{7,0,1}</text>
  <text x="254" y="147" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="254" y="160" text-anchor="middle" fill="#fbbf24" font-size="9">-7→{0,1,2}</text>
  <text x="307" y="147" text-anchor="middle" fill="#34d399">H</text>
  <text x="307" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">{0,1,2}</text>
  <text x="360" y="147" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="360" y="160" text-anchor="middle" fill="#fbbf24" font-size="9">-1→{0,2,3}</text>
  <text x="413" y="147" text-anchor="middle" fill="#34d399">H</text>
  <text x="413" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">{0,2,3}</text>
  <text x="466" y="147" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="466" y="160" text-anchor="middle" fill="#fbbf24" font-size="9">-0→{2,3,4}</text>
  <text x="519" y="147" text-anchor="middle" fill="#34d399">H</text>
  <text x="519" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">{2,3,4}</text>
  <text x="572" y="147" text-anchor="middle" fill="#34d399">H</text>
  <text x="572" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">{2,3,4}</text>
  <text x="625" y="147" text-anchor="middle" fill="#f87171" font-weight="bold">F</text>
  <text x="625" y="160" text-anchor="middle" fill="#fbbf24" font-size="9">-2→{3,4,0}</text>
  <text x="678" y="147" text-anchor="middle" fill="#34d399">H</text>
  <text x="678" y="160" text-anchor="middle" fill="#94a3b8" font-size="9">{3,4,0}</text>
  <text x="715" y="153" text-anchor="middle" fill="#34d399" font-weight="bold" font-size="12">7F</text>

  <!-- Highlight: OPT hits at steps 9 and 10 vs LRU faults -->
  <rect x="501" y="127" width="90" height="32" rx="4" fill="rgba(52,211,153,.08)" stroke="#34d399" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Separator line -->
  <line x1="60" y1="170" x2="730" y2="170" stroke="#2e3354" stroke-width="1.5"/>

  <!-- Summary row -->
  <text x="365" y="192" text-anchor="middle" fill="#e2e8f0" font-size="12">
    Page Faults  —  OPT: <tspan fill="#34d399" font-weight="bold">7</tspan>   LRU: <tspan fill="#fbbf24" font-weight="bold">9</tspan>   FIFO: <tspan fill="#f87171" font-weight="bold">10</tspan>   (fewer faults = better)
  </text>
  <text x="365" y="212" text-anchor="middle" fill="#94a3b8" font-size="10">
    F = page fault (disk load)  |  H = hit  |  -N = evicted page  |  {} = frames after step
  </text>
  <text x="365" y="232" text-anchor="middle" fill="#94a3b8" font-size="10">
    Key insight: LRU saves 1 fault (step 7, p=0 hit) vs FIFO; OPT saves 2 more (steps 9–10, future-aware)
  </text>
  <text x="365" y="255" text-anchor="middle" fill="#94a3b8" font-size="10">
    OPT evicts the page whose next use is furthest away — e.g. at step 4, page 7 won't be used again (-7)
  </text>
  <text x="365" y="272" text-anchor="middle" fill="#6c8efb" font-size="10">
    ↑ Use the Simulator tab to interactively run any reference string with any number of frames
  </text>
</svg>`
};

/* ──────────────────────────────────────────
   PAGE REPLACEMENT ALGORITHMS
────────────────────────────────────────── */
function runFIFO(refs, frames) {
  const mem = [], queue = [], result = [];
  for (let i = 0; i < refs.length; i++) {
    const p = refs[i];
    if (mem.includes(p)) {
      result.push({ page: p, frames: [...mem], fault: false, evicted: null });
    } else {
      let evicted = null;
      if (mem.length === frames) {
        evicted = queue.shift();
        mem.splice(mem.indexOf(evicted), 1);
      }
      mem.push(p);
      queue.push(p);
      result.push({ page: p, frames: [...mem], fault: true, evicted });
    }
  }
  return result;
}

function runLRU(refs, frames) {
  const mem = [], result = [];
  for (let i = 0; i < refs.length; i++) {
    const p = refs[i];
    if (mem.includes(p)) {
      mem.splice(mem.indexOf(p), 1);
      mem.push(p);
      result.push({ page: p, frames: [...mem], fault: false, evicted: null });
    } else {
      let evicted = null;
      if (mem.length === frames) {
        evicted = mem.shift();
      }
      mem.push(p);
      result.push({ page: p, frames: [...mem], fault: true, evicted });
    }
  }
  return result;
}

function runOPT(refs, frames) {
  // Precompute future occurrences for O(1) lookup per page per step
  const futureOccurrences = new Map();
  refs.forEach((p, i) => {
    if (!futureOccurrences.has(p)) futureOccurrences.set(p, []);
    futureOccurrences.get(p).push(i);
  });
  // Pointer for each page: tracks the next unprocessed index in its occurrence list
  const ptrs = new Map([...futureOccurrences.keys()].map(k => [k, 0]));

  const mem = [], result = [];
  for (let i = 0; i < refs.length; i++) {
    const p = refs[i];
    // Advance pointer past current position so it points to the NEXT future use
    const occ = futureOccurrences.get(p);
    const ptr = ptrs.get(p);
    if (ptr < occ.length && occ[ptr] === i) ptrs.set(p, ptr + 1);

    if (mem.includes(p)) {
      result.push({ page: p, frames: [...mem], fault: false, evicted: null });
    } else {
      let evicted = null;
      if (mem.length === frames) {
        // Find the page whose next use is furthest in the future
        let farthest = -1, victim = null;
        for (const pg of mem) {
          const pgOcc = futureOccurrences.get(pg) || [];
          const pgPtr = ptrs.get(pg) || 0;
          const nextUse = pgPtr < pgOcc.length ? pgOcc[pgPtr] : Infinity;
          if (nextUse === Infinity) { victim = pg; break; }
          if (nextUse > farthest) { farthest = nextUse; victim = pg; }
        }
        evicted = victim;
        mem.splice(mem.indexOf(evicted), 1);
      }
      mem.push(p);
      result.push({ page: p, frames: [...mem], fault: true, evicted });
    }
  }
  return result;
}

/* ──────────────────────────────────────────
   BUILD HTML
────────────────────────────────────────── */
function buildRoadmap() {
  const container = document.getElementById('roadmap');
  container.innerHTML = '';

  TOPICS.forEach(topic => {
    const node = document.createElement('div');
    node.className = 'topic-node';
    node.dataset.id = topic.id;
    node.dataset.num = topic.num;

    node.innerHTML = `
      <div class="topic-card">
        <div class="topic-header" role="button" aria-expanded="false">
          <div class="topic-header-left">
            <div class="topic-icon">${topic.icon}</div>
            <div class="topic-meta">
              <h3>${topic.title}</h3>
              <p>${topic.subtitle}</p>
            </div>
          </div>
          <div class="topic-header-right">
            <span class="topic-status-badge">Not started</span>
            <span class="chevron">▼</span>
          </div>
        </div>
        <div class="topic-body">
          ${buildTabs(topic)}
        </div>
      </div>
    `;

    // Toggle open/close
    node.querySelector('.topic-header').addEventListener('click', () => toggleTopic(node));

    container.appendChild(node);
  });
}

function buildTabs(topic) {
  const tabBtns = topic.tabs.map((t, i) =>
    `<button class="tab-btn${i === 0 ? ' active' : ''}" data-tab="${topic.id}-${t.toLowerCase()}">${t}</button>`
  ).join('');

  const panels = topic.tabs.map((t, i) => {
    const panelId = `${topic.id}-${t.toLowerCase()}`;
    let content = '';
    if (t === 'Learn') content = `<div class="explanation">${topic.learn}</div>`;
    else if (t === 'Diagram') content = buildDiagram(topic.id);
    else if (t === 'Quiz') content = buildQuiz(topic);
    else if (t === 'Simulator') content = buildSimulator();
    return `<div class="tab-panel${i === 0 ? ' active' : ''}" id="panel-${panelId}">${content}</div>`;
  }).join('');

  return `
    <nav class="tabs" role="tablist">${tabBtns}</nav>
    ${panels}
    <button class="mark-complete-btn" data-topic="${topic.id}">
      <span>✓</span> Mark as Complete
    </button>
  `;
}

function buildDiagram(id) {
  const svgMap = {
    arch: { svg: DIAGRAMS.arch, caption: 'CPU Internal Architecture & System Bus Interconnects' },
    memory: { svg: DIAGRAMS.memory, caption: 'Memory Hierarchy Pyramid (faster/smaller at top, slower/larger at bottom)' },
    vmem: { svg: DIAGRAMS.vmem, caption: 'Virtual Address Translation: VPN → MMU/TLB → Page Table → Physical Frame' },
    pagefault: { svg: DIAGRAMS.pagefault, caption: 'Page Fault Handling Flowchart (OS + Hardware cooperation)' },
    replacement: { svg: DIAGRAMS.replacement, caption: 'Page Replacement Comparison: FIFO(10F) vs LRU(9F) vs OPT(7F) on reference string 7 0 1 2 0 3 0 4 2 3 0 3 (3 frames)' }
  };
  const d = svgMap[id];
  return `<div class="diagram-wrap">${d.svg}<p class="diagram-caption">${d.caption}</p></div>`;
}

function buildQuiz(topic) {
  const qs = topic.quiz.map((q, qi) => `
    <div class="quiz-question" id="qq-${topic.id}-${qi}" data-qi="${qi}" data-topic="${topic.id}">
      <p>${qi + 1}. ${q.q}</p>
      <div class="quiz-options">
        ${q.options.map((opt, oi) =>
          `<button class="quiz-option" data-oi="${oi}" data-correct="${oi === q.answer}">${opt}</button>`
        ).join('')}
      </div>
      <div class="quiz-feedback" style="display:none"></div>
    </div>
  `).join('');

  return `
    <div class="quiz-container">
      <h4>🧠 Knowledge Check</h4>
      ${qs}
      <div class="quiz-actions">
        <button class="btn-primary" id="check-btn-${topic.id}" disabled>Check Answers</button>
        <button class="btn-secondary" id="retry-btn-${topic.id}" style="display:none">Retry Quiz</button>
        <span id="quiz-msg-${topic.id}" style="font-size:.82rem;color:var(--muted)"></span>
      </div>
      <div id="quiz-score-${topic.id}" style="display:none"></div>
    </div>
  `;
}

function buildSimulator() {
  return `
    <div class="simulator">
      <h4>🔬 Page Replacement Simulator</h4>
      <div class="sim-controls">
        <div class="sim-field">
          <label for="sim-refs">Reference String (space or comma separated)</label>
          <input type="text" id="sim-refs" value="7 0 1 2 0 3 0 4 2 3 0 3" placeholder="e.g. 7 0 1 2 0 3 0 4 2 3 0 3">
        </div>
        <div class="sim-field">
          <label for="sim-frames">Number of Frames</label>
          <input type="number" id="sim-frames" min="1" max="10" value="3">
        </div>
      </div>
      <div class="sim-algo-tabs">
        <button class="sim-algo-btn active" data-algo="FIFO">FIFO</button>
        <button class="sim-algo-btn" data-algo="LRU">LRU</button>
        <button class="sim-algo-btn" data-algo="OPT">Optimal</button>
        <button class="sim-algo-btn" data-algo="ALL">Compare All</button>
      </div>
      <button class="sim-run-btn">▶ Run Simulation</button>
      <div id="sim-output"></div>
    </div>
  `;
}

/* ──────────────────────────────────────────
   EVENT WIRING
────────────────────────────────────────── */
function wireEvents() {
  // Tab switching (delegated)
  document.getElementById('roadmap').addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const panel = btn.closest('.topic-body');
    panel.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    panel.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panelId = 'panel-' + btn.dataset.tab;
    panel.querySelector('#' + panelId)?.classList.add('active');
  });

  // Quiz option selection (delegated)
  document.getElementById('roadmap').addEventListener('click', e => {
    const opt = e.target.closest('.quiz-option');
    if (!opt || opt.disabled) return;
    const questionEl = opt.closest('.quiz-question');
    questionEl.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    // Enable check button if all answered
    const topicId = questionEl.dataset.topic;
    checkAllAnswered(topicId);
  });

  // Check answers (delegated)
  document.getElementById('roadmap').addEventListener('click', e => {
    const btn = e.target.closest('.btn-primary[id^="check-btn-"]');
    if (!btn) return;
    const topicId = btn.id.replace('check-btn-', '');
    gradeQuiz(topicId);
  });

  // Retry quiz
  document.getElementById('roadmap').addEventListener('click', e => {
    const btn = e.target.closest('[id^="retry-btn-"]');
    if (!btn) return;
    const topicId = btn.id.replace('retry-btn-', '');
    resetQuiz(topicId);
  });

  // Mark complete (delegated)
  document.getElementById('roadmap').addEventListener('click', e => {
    const btn = e.target.closest('.mark-complete-btn');
    if (!btn || btn.classList.contains('done')) return;
    const topicId = btn.dataset.topic;
    markComplete(topicId);
  });

  // Simulator algo tabs (delegated)
  document.getElementById('roadmap').addEventListener('click', e => {
    const btn = e.target.closest('.sim-algo-btn');
    if (!btn) return;
    btn.closest('.sim-algo-tabs').querySelectorAll('.sim-algo-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });

  // Simulator run
  document.getElementById('roadmap').addEventListener('click', e => {
    const btn = e.target.closest('.sim-run-btn');
    if (!btn) return;
    runSimulator();
  });

  // Share button
  document.getElementById('share-btn').addEventListener('click', shareURL);

  // Reset button
  document.getElementById('reset-btn').addEventListener('click', resetAll);
}

/* ──────────────────────────────────────────
   TOPIC TOGGLE
────────────────────────────────────────── */
function toggleTopic(node) {
  const isOpen = node.classList.contains('open');
  // Close all
  document.querySelectorAll('.topic-node.open').forEach(n => {
    n.classList.remove('open');
    n.querySelector('.topic-header').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    node.classList.add('open');
    node.classList.add('active');
    node.querySelector('.topic-header').setAttribute('aria-expanded', 'true');
    node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ──────────────────────────────────────────
   QUIZ LOGIC
────────────────────────────────────────── */
function checkAllAnswered(topicId) {
  const topicEl = document.querySelector(`.topic-node[data-id="${topicId}"]`);
  const questions = topicEl.querySelectorAll('.quiz-question');
  const allAnswered = [...questions].every(q => q.querySelector('.quiz-option.selected'));
  const checkBtn = document.getElementById(`check-btn-${topicId}`);
  if (checkBtn) checkBtn.disabled = !allAnswered;
}

function gradeQuiz(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  const topicEl = document.querySelector(`.topic-node[data-id="${topicId}"]`);
  let score = 0;

  topic.quiz.forEach((q, qi) => {
    const qEl = document.getElementById(`qq-${topicId}-${qi}`);
    const selected = qEl.querySelector('.quiz-option.selected');
    const isCorrect = selected && selected.dataset.correct === 'true';
    if (isCorrect) score++;

    // Disable all options
    qEl.querySelectorAll('.quiz-option').forEach(opt => {
      opt.disabled = true;
      if (opt.dataset.correct === 'true') opt.classList.add('correct-ans');
      else if (opt === selected && !isCorrect) opt.classList.add('wrong-ans');
    });

    // Show feedback
    const feedback = qEl.querySelector('.quiz-feedback');
    feedback.style.display = 'block';
    if (isCorrect) {
      qEl.classList.add('correct');
      feedback.className = 'quiz-feedback correct';
      feedback.textContent = '✓ Correct! ' + q.explanation;
    } else {
      qEl.classList.add('incorrect');
      feedback.className = 'quiz-feedback incorrect';
      feedback.textContent = '✗ ' + q.explanation;
    }
  });

  // Store score
  state.quizScores[topicId] = { score, total: topic.quiz.length };
  saveState();

  // Show score
  const pct = Math.round((score / topic.quiz.length) * 100);
  const scoreEl = document.getElementById(`quiz-score-${topicId}`);
  scoreEl.style.display = 'block';
  scoreEl.innerHTML = `
    <div class="quiz-score">
      <div class="score-num">${score}/${topic.quiz.length}</div>
      <p>${pct}% — ${pct === 100 ? '🎉 Perfect score!' : pct >= 60 ? '👍 Good work!' : '📚 Review the material and try again.'}</p>
    </div>
  `;

  // Show retry, hide check
  document.getElementById(`check-btn-${topicId}`).style.display = 'none';
  document.getElementById(`retry-btn-${topicId}`).style.display = '';

  // Auto-mark complete on perfect score
  if (pct === 100) markComplete(topicId);
}

function resetQuiz(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  const topicEl = document.querySelector(`.topic-node[data-id="${topicId}"]`);

  topic.quiz.forEach((q, qi) => {
    const qEl = document.getElementById(`qq-${topicId}-${qi}`);
    qEl.className = 'quiz-question';
    qEl.querySelectorAll('.quiz-option').forEach(opt => {
      opt.disabled = false;
      opt.className = 'quiz-option';
    });
    const feedback = qEl.querySelector('.quiz-feedback');
    feedback.style.display = 'none';
    feedback.textContent = '';
  });

  const checkBtn = document.getElementById(`check-btn-${topicId}`);
  checkBtn.style.display = '';
  checkBtn.disabled = true;
  document.getElementById(`retry-btn-${topicId}`).style.display = 'none';
  document.getElementById(`quiz-score-${topicId}`).style.display = 'none';
}

/* ──────────────────────────────────────────
   MARK COMPLETE / PROGRESS
────────────────────────────────────────── */
function markComplete(topicId) {
  state.completed.add(topicId);
  saveState();
  updateUI();

  const node = document.querySelector(`.topic-node[data-id="${topicId}"]`);
  if (node) {
    node.classList.add('completed');
    node.querySelector('.topic-status-badge').textContent = '✓ Complete';
    node.querySelector('.topic-status-badge').classList.add('done');
    const btn = node.querySelector('.mark-complete-btn');
    if (btn) { btn.classList.add('done'); btn.innerHTML = '<span>✓</span> Completed'; }
  }
}

function updateUI() {
  const total = TOPICS.length;
  const done = state.completed.size;
  const pct = Math.round((done / total) * 100);

  // Header pill
  document.querySelector('.progress-bar-fill').style.width = pct + '%';
  document.querySelector('.progress-pill span').textContent = `${done}/${total} topics`;

  // Overall banner
  document.getElementById('overall-pct').textContent = pct + '%';
  document.getElementById('overall-bar').style.width = pct + '%';
  document.getElementById('overall-label').textContent = `${done} of ${total} topics completed`;

  // Badges
  updateBadges(done);

  // Nodes
  TOPICS.forEach(t => {
    const node = document.querySelector(`.topic-node[data-id="${t.id}"]`);
    if (!node) return;
    if (state.completed.has(t.id)) {
      node.classList.add('completed');
      node.querySelector('.topic-status-badge').textContent = '✓ Complete';
      node.querySelector('.topic-status-badge').classList.add('done');
      const btn = node.querySelector('.mark-complete-btn');
      if (btn) { btn.classList.add('done'); btn.innerHTML = '<span>✓</span> Completed'; }
    }
  });
}

function updateBadges(done) {
  const badges = [
    { id: 'badge-first', threshold: 1, icon: '🌱', label: 'Started' },
    { id: 'badge-half', threshold: Math.ceil(TOPICS.length / 2), icon: '⚡', label: 'Halfway' },
    { id: 'badge-all', threshold: TOPICS.length, icon: '🏆', label: 'Complete' }
  ];
  badges.forEach(b => {
    const el = document.getElementById(b.id);
    if (el) el.classList.toggle('earned', done >= b.threshold);
  });
}

/* ──────────────────────────────────────────
   SIMULATOR
────────────────────────────────────────── */
function runSimulator() {
  const refsInput = document.getElementById('sim-refs').value;
  const frames = parseInt(document.getElementById('sim-frames').value, 10);
  const refs = [];
  for (const token of refsInput.split(/[\s,]+/)) {
    const t = token.trim();
    if (t) refs.push(Number(t));
  }
  const activeAlgo = document.querySelector('.sim-algo-btn.active')?.dataset.algo || 'FIFO';
  const out = document.getElementById('sim-output');

  if (refs.length === 0 || refs.some(n => Number.isNaN(n)) || frames < 1) {
    out.innerHTML = '<p style="color:var(--danger);font-size:.85rem">⚠ Invalid input. Use space/comma-separated integers and frames ≥ 1.</p>';
    return;
  }
  if (refs.length > 30) {
    out.innerHTML = '<p style="color:var(--danger);font-size:.85rem">⚠ Please limit the reference string to 30 entries for readability.</p>';
    return;
  }

  if (activeAlgo === 'ALL') {
    const r1 = runFIFO(refs, frames);
    const r2 = runLRU(refs, frames);
    const r3 = runOPT(refs, frames);
    out.innerHTML =
      `<p style="color:var(--accent);font-size:.85rem;font-weight:600;margin-bottom:.75rem">Comparing all algorithms — ${frames} frame(s)</p>` +
      renderSimTable('FIFO', r1, frames) +
      renderSimTable('LRU', r2, frames) +
      renderSimTable('Optimal', r3, frames) +
      renderCompare(r1, r2, r3);
  } else {
    const fns = { FIFO: runFIFO, LRU: runLRU, OPT: runOPT };
    const result = fns[activeAlgo](refs, frames);
    out.innerHTML = renderSimTable(activeAlgo, result, frames) + renderStats(result);
  }
}

function renderSimTable(name, result, frames) {
  const algoColors = { FIFO: '#f87171', LRU: '#fbbf24', OPT: '#34d399', Optimal: '#34d399' };
  const color = algoColors[name] || '#6c8efb';
  let html = `<p style="font-weight:600;font-size:.85rem;color:${color};margin:.9rem 0 .4rem">${name}</p>`;
  html += '<div class="sim-table-wrap"><table class="sim-table"><thead><tr>';
  html += '<th>Step</th><th>Page</th>';
  for (let f = 0; f < frames; f++) html += `<th>Frame ${f + 1}</th>`;
  html += '<th>Result</th></tr></thead><tbody>';

  result.forEach((step, i) => {
    html += `<tr><td>${i + 1}</td><td><strong>${step.page}</strong></td>`;
    for (let f = 0; f < frames; f++) {
      const pg = step.frames[f];
      const isEvicted = step.evicted !== null && step.frames[f] === undefined;
      if (pg !== undefined) {
        const wasNew = step.fault && step.frames[f] === step.page && f === step.frames.indexOf(step.page);
        html += `<td${wasNew ? ' class="fault"' : ''}>${pg}</td>`;
      } else {
        html += '<td>—</td>';
      }
    }
    html += `<td class="${step.fault ? 'fault' : 'hit'}">${step.fault ? `FAULT${step.evicted !== null ? ' (-' + step.evicted + ')' : ''}` : 'HIT'}</td></tr>`;
  });

  html += '</tbody></table></div>';
  return html;
}

function renderStats(result) {
  const faults = result.filter(r => r.fault).length;
  const hits = result.length - faults;
  const rate = ((hits / result.length) * 100).toFixed(1);
  return `
    <div class="sim-stats">
      <div class="sim-stat"><div class="val">${result.length}</div><div class="lbl">References</div></div>
      <div class="sim-stat"><div class="val danger">${faults}</div><div class="lbl">Page Faults</div></div>
      <div class="sim-stat"><div class="val success">${hits}</div><div class="lbl">Hits</div></div>
      <div class="sim-stat"><div class="val">${rate}%</div><div class="lbl">Hit Rate</div></div>
    </div>
  `;
}

function renderCompare(r1, r2, r3) {
  const f1 = r1.filter(r => r.fault).length;
  const f2 = r2.filter(r => r.fault).length;
  const f3 = r3.filter(r => r.fault).length;
  const best = Math.min(f1, f2, f3);
  return `
    <div class="sim-stats" style="margin-top:1rem">
      <div class="sim-stat"><div class="val ${f1 === best ? 'success' : 'danger'}">${f1}</div><div class="lbl">FIFO Faults</div></div>
      <div class="sim-stat"><div class="val ${f2 === best ? 'success' : ''}">${f2}</div><div class="lbl">LRU Faults</div></div>
      <div class="sim-stat"><div class="val success">${f3}</div><div class="lbl">OPT Faults</div></div>
    </div>
  `;
}

/* ──────────────────────────────────────────
   PERSIST / SHARE
────────────────────────────────────────── */
const STORAGE_KEY = 'cs312_progress';

function saveState() {
  const data = {
    completed: [...state.completed],
    quizScores: state.quizScores
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (err) {
    showToast('⚠ Could not save progress: ' + (err.name || 'storage error'));
  }
  // Update URL hash (shareable)
  const hash = encodeURIComponent(JSON.stringify({ c: [...state.completed] }));
  history.replaceState(null, '', '#' + hash);
}

function loadState() {
  // Try URL hash first (shared link)
  if (location.hash) {
    try {
      const decoded = JSON.parse(decodeURIComponent(location.hash.slice(1)));
      if (decoded.c) decoded.c.forEach(id => state.completed.add(id));
      return;
    } catch (_) {}
  }
  // Fallback to localStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.completed) data.completed.forEach(id => state.completed.add(id));
    if (data.quizScores) Object.assign(state.quizScores, data.quizScores);
  } catch (_) {}
}

function shareURL() {
  const url = location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast('📋 Shareable URL copied to clipboard!'));
  } else {
    prompt('Copy this URL to share your progress:', url);
  }
}

function resetAll() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  state.completed.clear();
  state.quizScores = {};
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  history.replaceState(null, '', location.pathname);
  // Rebuild
  buildRoadmap();
  wireEvents();
  updateUI();
  showToast('🔄 Progress reset');
}

/* ──────────────────────────────────────────
   TOAST
────────────────────────────────────────── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ──────────────────────────────────────────
   INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  buildRoadmap();
  wireEvents();
  updateUI();

  // Open first incomplete topic by default
  const firstIncomplete = TOPICS.find(t => !state.completed.has(t.id));
  if (firstIncomplete) {
    const node = document.querySelector(`.topic-node[data-id="${firstIncomplete.id}"]`);
    if (node) toggleTopic(node);
  }
});
