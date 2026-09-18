// Inquiries storage
const inquiries = [];

export const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, schoolName, studentCount, message, type = 'DEMO_REQUEST' } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required to submit an inquiry.'
      });
    }

    const newInquiry = {
      id: `inq_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      schoolName: schoolName || 'Not specified',
      studentCount: studentCount || '100-500',
      message: message || '',
      type,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    inquiries.push(newInquiry);

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received! An INGO Schools specialist will contact you shortly.',
      data: newInquiry
    });
  } catch (error) {
    console.error('Error handling inquiry:', error);
    return res.status(500).json({ success: false, message: 'Server error processing inquiry.' });
  }
};

export const getFeatures = (req, res) => {
  const features = [
    {
      id: 'feat_easy',
      title: 'Easy to Use',
      description: 'Simple and intuitive for everyone.',
      icon: 'GraduationCap',
      color: '#2563EB',
      bgColor: '#EFF6FF'
    },
    {
      id: 'feat_secure',
      title: 'Secure',
      description: 'Your data is always protected.',
      icon: 'ShieldCheck',
      color: '#10B981',
      bgColor: '#ECFDF5'
    },
    {
      id: 'feat_cloud',
      title: 'Cloud Based',
      description: 'Access anytime, anywhere.',
      icon: 'Cloud',
      color: '#8B5CF6',
      bgColor: '#F5F3FF'
    },
    {
      id: 'feat_scalable',
      title: 'Scalable',
      description: "Grows with your school's needs.",
      icon: 'BarChart3',
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    }
  ];

  return res.json({ success: true, count: features.length, data: features });
};

export const getStats = (req, res) => {
  return res.json({
    success: true,
    data: {
      activeSchools: 1250,
      studentsManaged: 480000,
      teacherHoursSavedMonthly: 120000,
      systemUptimePercent: 99.98
    }
  });
};
