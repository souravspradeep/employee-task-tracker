const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;