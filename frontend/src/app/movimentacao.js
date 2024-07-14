"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/pt-br";
import SearchIcon from "@mui/icons-material/Search";
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";

export default function Movimentacao() {
  const [rows, setRows] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [movimentacaoSalva, setMovimentacaoSalva] = React.useState(false);

  const [movimentacao, setMovimentacao] = React.useState({
    idProduto: "",
    tipoMovimentacao: "",
    quantidade: "",
    observacao: "",
  });

  const [produto, setProduto] = React.useState([]);

  function pesquisaProduto() {
    fetch("http://localhost:3000/api/produtos")
      .then((res) => res.json())
      .then((data) => {
        setProduto(data);
      });
  }

  React.useEffect(() => {
    pesquisaProduto();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setMovimentacao({
      idProduto: "",
      tipoMovimentacao: "",
      quantidade: "",
      observacao: "",
    });
    setMovimentacaoSalva(false);
  };

  const handleClose = () => {
    setOpen(false);
    // ajustColumn();
  };

  function pesquisaMovimentacao() {
    let url = new URL("http://localhost:3000/api/movimentacaoEstoque");
    if (
      dataInicial != null &&
      new Date(dataInicial).toDateString() != "Invalid Date" &&
      dataFinal != null &&
      new Date(dataFinal).toDateString() != "Invalid Date"
    ) {
      url.searchParams.append("dataInicial", startOfDay(new Date(dataInicial)));
      url.searchParams.append("dataFinal", endOfDay(new Date(dataFinal)));
    }

    fetch(url.href)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let response = [];
        data.forEach((element) => {
          response.push({
            ...element,
            nomeProduto: element.produto.nome,
            createdAt: new Date(element.createdAt).toLocaleDateString("pt-br"),
          });
        });
        setRows(response);
      });
  }

  React.useEffect(() => {
    pesquisaMovimentacao();
  }, []);

  const columns = [
    {
      field: "tipoMovimentacao",
      headerName: "Movimentação",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Data",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 300,
    },
    {
      field: "nomeProduto",
      headerName: "Nome do produto",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 400,
    },
    {
      field: "quantidade",
      headerName: "Quantidade movimentada",
      type: "number",
      headerAlign: "left",
      align: "left",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 300,
    },
    {
      field: "observacao",
      headerName: "Observação",
      sortable: false,
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 200,
    },
  ];

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severitySnackBar, setSeveritySnackBar] = React.useState("error");
  const [textSnackBar, setTextSnackBar] = React.useState([]);
  const [dataInicial, setDataInicial] = React.useState(null);
  const [dataFinal, setDataFinal] = React.useState(null);

  function salvarMovimentacao() {
    let arrayMsgError = [];

    if (movimentacao.idProduto.length < 1) {
      arrayMsgError.push(<li>O campo produto não pode ser vazio!</li>);
    }

    if (movimentacao.tipoMovimentacao.length < 1) {
      arrayMsgError.push(
        <li>O campo tipo movimentação não pode ser vazio!</li>
      );
    }

    if (movimentacao.quantidade.length < 1 || movimentacao.quantidade < 1) {
      arrayMsgError.push(
        <li>O campo quantidade não pode ser vazio ou abaixo de 1!</li>
      );
    }

    if (arrayMsgError.length > 0) {
      setTextSnackBar(arrayMsgError);
      setSeveritySnackBar("error");
      setOpenSnackBar(true);
      return;
    }

    fetch(`http://localhost:3000/api/movimentacaoEstoque`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movimentacao),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        pesquisaMovimentacao();
        setTextSnackBar([data.msg]);
        setSeveritySnackBar("success");
        setOpenSnackBar(true);
        setMovimentacaoSalva(true);
        pesquisaProduto();
      })
      .catch((error) => {
        error.json().then((error) => {
          setTextSnackBar([error.msg]);
          setSeveritySnackBar("error");
          setOpenSnackBar(true);
        });
      });
  }

  return (
    <Box>
      <Stack
        spacing={2}
        direction="row"
        justifyContent={"space-between"}
        sx={{ marginBottom: 3 }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          NOVA MOVIMENTAÇÃO
        </Button>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => pesquisaMovimentacao()}
        >
          PESQUISAR
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          margin: 3,
          justifyContent: "center",
        }}
      >
        <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
          <DemoItem sx={{ marginRight: 10 }} label="Data inicial">
            <DateTimePicker
              format="DD/MM/YYYY"
              views={["day", "month", "year"]}
              value={dataInicial}
              onChange={(e) => {
                setDataInicial(e);
              }}
            />
          </DemoItem>
          <DemoItem label="Data final">
            <DateTimePicker
              format="DD/MM/YYYY"
              views={["day", "month", "year"]}
              value={dataFinal}
              onChange={(e) => {
                setDataFinal(e);
              }}
            />
          </DemoItem>
        </LocalizationProvider>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          slotProps={{
            pagination: {
              labelRowsPerPage: "Registros por página",
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle>Nova Movimentação</DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogContent>
          <TextField
            required
            id="idProduto"
            select
            label="Produto"
            fullWidth
            helperText={
              movimentacao.idProduto.length > 0
                ? "Quantidade disponível: " +
                  produto[
                    produto.findIndex(
                      (produto) => produto._id == movimentacao.idProduto
                    )
                  ].quantidadeDisponivel
                : ""
            }
            error={movimentacao.idProduto.length < 1}
            value={movimentacao.idProduto}
            onChange={(e) => {
              setMovimentacao({
                ...movimentacao,
                idProduto: e.target.value,
              });
            }}
          >
            {produto.map((produto) => (
              <MenuItem key={produto.nome} value={produto._id}>
                {produto.nome}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ flexGrow: 1, marginTop: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="tipoMovimentacao"
                  select
                  label="Tipo Movimentação"
                  fullWidth
                  error={movimentacao.tipoMovimentacao.length < 1}
                  value={movimentacao.tipoMovimentacao}
                  onChange={(e) => {
                    setMovimentacao({
                      ...movimentacao,
                      tipoMovimentacao: e.target.value,
                    });
                  }}
                >
                  {["ENTRADA", "SAÍDA"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  margin="dense"
                  type="number"
                  value={movimentacao.quantidade}
                  onChange={(e) => {
                    setMovimentacao({
                      ...movimentacao,
                      quantidade: e.target.value,
                    });
                  }}
                  id="quantidade"
                  error={movimentacao.quantidade.length < 1}
                  name="quantidade"
                  label="Quantidade"
                  fullWidth
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {movimentacaoSalva ? "Fechar" : "Cancelar"}
          </Button>
          {!movimentacaoSalva && (
            <Button onClick={() => salvarMovimentacao()}>Salvar</Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={severitySnackBar}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {textSnackBar.map((text) => {
            return text;
          })}
        </Alert>
      </Snackbar>
    </Box>
  );
}
