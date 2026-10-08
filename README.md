# Trackify
SmartSpend is a web-based expense tracking application designed for students. It helps users record income and expenses, create budgets, monitor spending habits, and generate financial reports. The system promotes better financial management through an intuitive dashboard, analytics, and budget alerts.


# Trackify

Trackify is a web-based expense tracking application designed to help students manage their personal finances effectively. The platform enables users to record income and expenses, create budgets, monitor spending habits, and generate financial reports for better financial decision-making.

## Features

* User registration and authentication
* Income management
* Expense tracking
* Expense categorization
* Budget creation and monitoring
* Financial dashboard
* Spending reports and analytics
* Search and filter transactions
* Profile management
* Budget alerts and notifications

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB

## Project Structure

```text
Trackify/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── views/
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
├── .env
├── server.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/trackify.git
```

2. Navigate to the project directory:

```bash
cd trackify
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and configure the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Start the application:

```bash
npm start
```

For development:

```bash
npm run dev
```

## Usage

1. Register an account.
2. Log in to your dashboard.
3. Add income sources.
4. Record expenses under different categories.
5. Create and monitor budgets.
6. View reports and spending analytics.
7. Track your financial progress over time.

## Objectives

* Help students manage their finances effectively.
* Promote budgeting and savings habits.
* Provide clear insights into spending patterns.
* Improve financial discipline and planning.

## Future Enhancements

* Mobile application support
* Recurring transaction tracking
* Multi-currency support
* AI-powered financial recommendations
* Export reports to PDF and Excel
* Cloud backup and synchronization

## Contributing

Contributions are welcome. Feel free to fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License.

## Author

**Ifeanyi Nwuzor**

Node.js Developer | Backend Engineer | Software Development Enthusiast

















 <!-- income receipt -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-4xl w-full items-stretch">
                
                <section id="printable-voucher" class="md:col-span-3 bg-white border border-slate-200/80 rounded-xl shadow-xs p-6 flex flex-col justify-between relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
                    
                    <div class="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>

                    <div>
                        <div class="flex items-start justify-between border-b border-slate-100 pb-4">
                            <div>
                                <h2 class="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                                    <i class="fa-solid fa-square-poll-horizontal text-emerald-500"></i> Trackify Layer
                                </h2>
                                <p class="text-[10px] text-slate-400 font-medium mt-0.5">Transaction Voucher Account</p>
                            </div>
                            <div class="text-right">
                                <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-bold text-[9px] uppercase tracking-wider">
                                    Success
                                </span>
                                <p class="text-[9px] text-slate-400 font-bold mt-1">REF: TRK-842915</p>
                            </div>
                        </div>

                        <div class="mt-5 space-y-3.5">
                            <div>
                                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Source / Issuing Entity</span>
                                <span class="text-xs font-bold text-slate-800">LiteAcad Portal Contract</span>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Classification Pool</span>
                                    <span class="inline-flex items-center px-2 py-0.5 mt-0.5 rounded-sm text-[10px] font-semibold bg-indigo-50 text-indigo-600">
                                        Freelance
                                    </span>
                                </div>
                                <div>
                                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Posting Date</span>
                                    <span class="text-xs font-bold text-slate-700">June 28, 2026</span>
                                </div>
                            </div>

                            <div class="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Memo / Reference Notes</span>
                                <p class="text-[11px] text-slate-600 leading-relaxed font-medium">Milestone payout for backend architecture development, student portal deployment, and database setup optimizations.</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
                        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Net Remittance Inflow</span>
                        <span class="text-lg font-black text-slate-900 tracking-tight">
                            ₦120,000.00
                        </span>
                    </div>

                </section>

                <section class="md:col-span-2 flex flex-col justify-between gap-4 no-print">
                    
                    <div class="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3.5 flex-grow">
                        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Validation Log</h4>
                        
                        <div class="space-y-2.5 text-[11px] text-slate-600 font-medium">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-shield-halved text-slate-400 text-xs w-4"></i>
                                <span>Status: <strong class="text-emerald-600">Verified Ledger Ingestion</strong></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-server text-slate-400 text-xs w-4"></i>
                                <span>Engine: <span class="text-slate-800 font-bold">Trackify Finance Cluster</span></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-fingerprint text-slate-400 text-xs w-4"></i>
                                <span class="truncate">Hash: <span class="font-mono text-slate-500 text-[10px]">A9F8E24D</span></span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-2">
                        <!-- <button onclick="window.print()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer">
                            <i class="fa-solid fa-print"></i> Print Voucher
                        </button>
                         -->
                       <a href="income-lo" class="w-full bg-[#10b981] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5">
    <i class="fa-solid fa-arrow-left"></i> Return to Logs
</a>
                    </div>

                </section>

            </div>



            <!-- expense receipt -->
             <div class="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-4xl w-full items-stretch">
                
    <section id="printable-voucher" class="md:col-span-3 bg-white border border-slate-200/80 rounded-xl shadow-xs p-6 flex flex-col justify-between relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
        
        <div class="absolute top-0 left-0 right-0 h-1 bg-rose-500"></div>

        <div>
            <div class="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                    <h2 class="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                        <i class="fa-solid fa-square-poll-horizontal text-rose-500"></i> Trackify Layer
                    </h2>
                    <p class="text-[10px] text-slate-400 font-medium mt-0.5">Expense Voucher Account</p>
                </div>
                <div class="text-right">
                    <span class="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-md font-bold text-[9px] uppercase tracking-wider">
                        Cleared
                    </span>
                    <p class="text-[9px] text-slate-400 font-bold mt-1">REF: EXP-319482</p>
                </div>
            </div>

            <div class="mt-5 space-y-3.5">
                <div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Vendor / Service Provider</span>
                    <span class="text-xs font-bold text-slate-800">AWS Cloud Hosting Architecture</span>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Expense Category Pool</span>
                        <span class="inline-flex items-center px-2 py-0.5 mt-0.5 rounded-sm text-[10px] font-semibold bg-rose-50 text-rose-600">
                            Infrastructure
                        </span>
                    </div>
                    <div>
                        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Posting Date</span>
                        <span class="text-xs font-bold text-slate-700">June 28, 2026</span>
                    </div>
                </div>

                <div class="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Memo / Structural Notes</span>
                    <p class="text-[11px] text-slate-600 leading-relaxed font-medium">Monthly recurring subscription settlement for database storage allocation, backup clusters, and hosting server runtimes.</p>
                </div>
            </div>
        </div>

        <div class="mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Net Outflow Debit</span>
            <span class="text-lg font-black text-slate-900 tracking-tight">
                -₦45,000.00
            </span>
        </div>

    </section>

    <section class="md:col-span-2 flex flex-col justify-between gap-4 no-print">
        
        <div class="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3.5 flex-grow">
            <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Validation Log</h4>
            
            <div class="space-y-2.5 text-[11px] text-slate-600 font-medium">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-shield-halved text-slate-400 text-xs w-4"></i>
                    <span>Status: <strong class="text-rose-600">Verified Ledger Ingestion</strong></span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-server text-slate-400 text-xs w-4"></i>
                    <span>Engine: <span class="text-slate-800 font-bold">Trackify Finance Cluster</span></span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-fingerprint text-slate-400 text-xs w-4"></i>
                    <span class="truncate">Hash: <span class="font-mono text-slate-500 text-[10px]">E7D2B91F</span></span>
                </div>
            </div>
        </div>

        <div class="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-2">
            <a href="expense-logs" class="w-full bg-[#10b981] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-arrow-left"></i> Return to Logs
            </a>
        </div>

    </section>

</div>