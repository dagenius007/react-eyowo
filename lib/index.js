'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var axios = _interopDefault(require('axios'));

const useScript = url => {
  const [isAdded, setIsAdded] = React.useState(false);
  React.useEffect(() => {
    if (window === undefined) {
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    setIsAdded(true);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
  return isAdded;
};

var EyowoHooks = (({
  billId,
  email,
  _callback,
  onClose,
  env,
  eyowoToken,
  verifyPayment = true
}) => {
  const isScriptAdded = useScript('https://js.eyowo.com/inline.js');
  const [loading, setLoading] = React.useState(false);
  const [paymentVerification, setPaymentVerification] = React.useState(false);
  const [verificationStatus, setVerificationStatus] = React.useState({
    paymentVerificationStatus: '',
    paymentVerificationErrorMessage: ''
  });
  React.useEffect(() => {
    if (paymentVerification) {
      verifyEyowoPayment(billId);
    }
  }, [paymentVerification]);

  const verifyEyowoPayment = async billId => {
    setLoading(true);

    try {
      await axios.get(`https://api.checkout.merchant.staging.eyowo.com/v1/bills/${billId}/verify`, {
        headers: {
          Authorization: `Bearer ${eyowoToken}`
        }
      });
      setVerificationStatus(status => ({ ...status,
        paymentVerificationStatus: 'approved'
      }));
    } catch (err) {
      let errMessage = '';

      if (!err.response) {
        errMessage = 'No internet connection';
      } else {
        errMessage = err.response.data.error || '';
      }

      setVerificationStatus(status => ({ ...status,
        paymentVerificationStatus: 'failed',
        paymentVerificationErrorMessage: errMessage
      }));
    }

    setLoading(false);
  };

  const makePayment = () => {
    if (!isScriptAdded) {
      console.log('Error adding script ');
      return null;
    }

    if (window && window.Eyowo) {
      window.Eyowo.initialize({
        id: billId,
        email,
        env: env || 'staging',
        onClose: onClose || function () {
          console.log('closed');
          return;
        },
        _callback: function () {
          _callback();

          verifyPayment && setPaymentVerification(true);
        }
      });
    }
  };

  return [loading, makePayment, verificationStatus];
});

exports.useEyowoPayment = EyowoHooks;
