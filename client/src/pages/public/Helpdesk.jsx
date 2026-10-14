import React from 'react';
import { Mail, MessageCircle, FileText } from 'lucide-react';
import { Card } from '../../components/common/Card';

export const Helpdesk = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto flex-1">
      <div className="text-center mb-8">
        <h1 className="page-title">University Helpdesk & Support</h1>
        <p className="type-16">
          Need help accessing your courses, resetting your account, or managing academic spaces?
        </p>
      </div>

      <div className="overview-stats">
        <Card variant="stat" className="text-center">
          <div className="icon-circle-ink mx-auto mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="type-18">IT Support Email</h3>
          <p className="type-14">support@university.edu</p>
        </Card>

        <Card variant="stat" className="text-center">
          <div className="icon-circle-ink mx-auto mb-3">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="type-18">Campus Registrar</h3>
          <p className="type-14">registrar@university.edu</p>
        </Card>

        <Card variant="stat" className="text-center">
          <div className="icon-circle-ink mx-auto mb-3">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="type-18">Knowledge Base</h3>
          <p className="type-14">Student & Faculty FAQs</p>
        </Card>
      </div>
    </div>
  );
};

export default Helpdesk;
