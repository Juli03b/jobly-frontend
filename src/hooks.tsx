import { useLocation } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar, VariantType } from 'notistack';

// Hook for grabbing query from url
export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

/* Hook for displaying snackbar alerts.
*
* defaultMsg: message to use if no further message provided
* defaultVarint: variant to use if no further variant provided
*/
export const useAlert = (defaultMsg?: string, defaultVariant?: VariantType) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); 
  const snackbar = (msg?: string, variant?: VariantType) => enqueueSnackbar(defaultMsg || msg, {
    variant: defaultVariant || variant,
    action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)}>
            <CloseIcon style={{color: "white"}} />
        </IconButton>
    )
  });

  return snackbar;
}
