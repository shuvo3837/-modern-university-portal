import React from 'react';
import { HelpCircle, Mail, MessageCircle, FileText } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const Helpdesk = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto flex-1">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">University Helpdesk & Support</h1>
        <p className="text-sm text-slate-600 mt-2">
          Need help accessing your courses, resetting your account, or managing academic spaces?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-6">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">IT Support Email</h3>
          <p className="text-xs text-slate-500 mt-1">support@university.edu</p>
        </Card>

        <Card className="text-center p-6">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Campus Registrar</h3>
          <p className="text-xs text-slate-500 mt-1">registrar@university.edu</p>
        </Card>

        <Card className="text-center p-6">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Knowledge Base</h3>
          <p className="text-xs text-slate-500 mt-1">Student & Faculty FAQs</p>
        </Card>
      </div>
    </div>
  );
};

export default Helpdesk;
