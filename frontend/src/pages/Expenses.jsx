
import React, { useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, PlusCircle, Calendar, DollarSign, Tag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import Sidebar from '../components/Sidebar';

const Expenses = () => {
 

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              
              <h1 className="text-2xl font-semibold">Expense Tracker</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Expenses;
