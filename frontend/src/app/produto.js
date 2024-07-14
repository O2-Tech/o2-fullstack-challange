"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export default function Produto() {
  const [produto, setProduto] = React.useState({
    nome: "",
    descricao: "",
    quantidadeDisponivel: "",
    precoUnitario: "0,00",
    categoria: "",
  });

  const [titleDialog, setTitleDialog] = React.useState("Novo Produto");
  const [disabledQuantidade, setDisabledQuantidade] = React.useState(false);
  const [helperTextQuantidade, setHelperTextQuantidade] = React.useState(
    "Ao salvar, se a quantidade for maior que zero, será gerada uma movimentação de entrada com essa quantidade"
  );
  const columns = [
    {
      field: "nome",
      headerName: "Nome do Produto",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 300,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 300,
    },
    {
      field: "quantidadeDisponivel",
      headerName: "Quantidade disponível",
      type: "number",
      headerAlign: "left",
      align: "left",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 200,
    },
    {
      field: "precoUnitario",
      headerName: "Preço unitário",
      description: "Preço unitário",
      sortable: false,
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 200,
    },
    {
      field: "categoria",
      headerName: "Categoria",
      sortable: false,
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      width: 200,
    },
    {
      field: "id",
      headerName: "Ações",
      type: "actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<ModeEditIcon />}
            label="Editar"
            sx={{ color: "primary.main" }}
            onClick={() => {
              fetch(`http://localhost:3000/api/produtos/${id}`)
                .then((res) => {
                  if (!res.ok) {
                    throw res;
                  }
                  return res.json();
                })
                .then((data) => {
                  setProduto({
                    ...data,
                    precoUnitario: data.precoUnitario
                      .toString()
                      .replaceAll(".", ","),
                  });
                  setTitleDialog("Editar Produto");
                  setDisabledQuantidade(true);
                  setHelperTextQuantidade(
                    "Para alterar a quantidade é necessário fazer uma movimentação de entrada ou saída"
                  );
                  setOpen(true);
                })
                .catch((error) => {
                  error.json().then((error) => {
                    setTextSnackBar([error.msg]);
                    setSeveritySnackBar("error");
                    setOpenSnackBar(true);
                  });
                });
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Excluir"
            sx={{ color: "primary.main" }}
            onClick={() => {
              fetch(`http://localhost:3000/api/produtos/${id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then((data) => {
                  setTextSnackBar([data.msg]);
                  setSeveritySnackBar("success");
                  setOpenSnackBar(true);
                  pesquisaProduto();
                });
            }}
          />,
        ];
      },
      width: 100,
    },
  ];

  const [rows, setRows] = React.useState([]);
  const [nomeProduto, setNomeProduto] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:3000/api/produtos")
      .then((res) => res.json())
      .then((data) => {
        let response = [];
        data.forEach((element) => {
          response.push({
            nome: element.nome,
            descricao: element.descricao,
            quantidadeDisponivel: element.quantidadeDisponivel,
            precoUnitario: element.precoUnitario
              .toString()
              .replaceAll(".", ","),
            categoria: element.categoria,
            id: element._id,
          });
        });
        setRows(response);
      });
  }, []);

  function pesquisaProduto() {
    let url = new URL("http://localhost:3000/api/produtos");
    url.searchParams.append("pesquisa", nomeProduto);
    fetch(url.href)
      .then((res) => res.json())
      .then((data) => {
        let response = [];
        data.forEach((element) => {
          response.push({
            nome: element.nome,
            descricao: element.descricao,
            quantidadeDisponivel: element.quantidadeDisponivel,
            precoUnitario: element.precoUnitario
              .toString()
              .replaceAll(".", ","),
            categoria: element.categoria,
            id: element._id,
          });
        });
        setRows(response);
      });
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setTitleDialog("Novo Produto");
    setDisabledQuantidade(false);
    setHelperTextQuantidade(
      "Ao salvar, se a quantidade for maior que zero, será gerada uma movimentação de entrada com essa quantidade"
    );
    setProduto({
      nome: "",
      descricao: "",
      quantidadeDisponivel: "",
      precoUnitario: "0,00",
      categoria: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categorias = [
    {
      value: "ESCRITÓRIO",
    },
    {
      value: "ELETRÔNICO",
    },
    {
      value: "COMIDA",
    },
  ];

  function formataVirgula(preco) {
    preco = preco.replace(/\D/g, "");

    preco = Number(preco);

    preco = preco.toLocaleString("pt-BR", {
      style: "decimal",
      minimumIntegerDigits: 3,
    });

    let arr = preco.split("");
    arr.splice(-2, 0, ",");

    preco = arr.join("");

    preco = preco.replaceAll(".", "");

    return preco;
  }

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severitySnackBar, setSeveritySnackBar] = React.useState("error");
  const [textSnackBar, setTextSnackBar] = React.useState([]);

  function salvarProduto() {
    let arrayMsgError = [];

    if (produto.nome.length < 1) {
      arrayMsgError.push(<li>O campo nome do produto não pode ser vazio!</li>);
    }

    if (produto.descricao.length < 1) {
      arrayMsgError.push(
        <li>O campo descrição do produto não pode ser vazio!</li>
      );
    }

    if (
      produto.quantidadeDisponivel.length < 1 ||
      produto.quantidadeDisponivel < 0
    ) {
      arrayMsgError.push(
        <li>
          O campo quantidade disponível não pode ser vazio ou abaixo de zero!
        </li>
      );
    }

    if (
      produto.precoUnitario.length < 1 ||
      Number(produto.precoUnitario.toString().replace(",", ".")) == 0
    ) {
      arrayMsgError.push(
        <li>O campo preço unitário não pode ser vazio ou com valor zero!</li>
      );
    }

    if (produto.categoria.length < 1) {
      arrayMsgError.push(<li>O campo categoria não pode ser vazio!</li>);
    }

    if (arrayMsgError.length > 0) {
      setTextSnackBar(arrayMsgError);
      setSeveritySnackBar("error");
      setOpenSnackBar(true);
      return;
    }

    if (produto._id) {
      fetch(`http://localhost:3000/api/produtos/${produto._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      })
        .then((res) => res.json())
        .then((data) => {
          pesquisaProduto();
          setTextSnackBar([data.msg]);
          setSeveritySnackBar("success");
          setOpenSnackBar(true);
        });
    } else {
      fetch(`http://localhost:3000/api/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      })
        .then((res) => res.json())
        .then((data) => {
          setProduto({
            ...data.response,
            precoUnitario: data.response.precoUnitario
              .toString()
              .replaceAll(".", ","),
          });
          pesquisaProduto();
          setTextSnackBar([data.msg]);
          setSeveritySnackBar("success");
          setOpenSnackBar(true);

          setTitleDialog("Editar Produto");
          setDisabledQuantidade(true);
          setHelperTextQuantidade(
            "Para alterar a quantidade é necessário fazer uma movimentação de entrada ou saída"
          );
        });
    }
  }

  return (
    <Box>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          NOVO PRODUTO
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: 3,
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 600,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Pesquisar produtos"
            value={nomeProduto}
            onChange={(e) => {
              setNomeProduto(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                pesquisaProduto();
              }
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            color="primary"
            onClick={() => pesquisaProduto()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
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
        <DialogTitle>{titleDialog}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="nome"
            value={produto.nome}
            onChange={(e) => {
              setProduto({
                ...produto,
                nome: e.target.value,
              });
            }}
            error={produto.nome.length < 1}
            name="nome"
            label="Nome do produto"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="descricao"
            value={produto.descricao}
            onChange={(e) => {
              setProduto({
                ...produto,
                descricao: e.target.value,
              });
            }}
            error={produto.descricao.length < 1}
            name="descricao"
            label="Descricao do produto"
            fullWidth
            variant="standard"
          />
          <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  disabled={disabledQuantidade}
                  type="number"
                  value={produto.quantidadeDisponivel}
                  onChange={(e) => {
                    setProduto({
                      ...produto,
                      quantidadeDisponivel: e.target.value,
                    });
                  }}
                  helperText={helperTextQuantidade}
                  id="quantidadeDisponivel"
                  error={produto.quantidadeDisponivel.length < 1}
                  name="quantidadeDisponivel"
                  label="Quantidade disponível"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="precoUnitario"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  value={produto.precoUnitario}
                  onChange={(e) => {
                    setProduto({
                      ...produto,
                      precoUnitario: formataVirgula(e.target.value),
                    });
                  }}
                  error={
                    produto.precoUnitario.length < 1 ||
                    Number(
                      produto.precoUnitario.toString().replace(",", ".")
                    ) == 0
                  }
                  name="precoUnitario"
                  label="Preço unitário"
                  fullWidth
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Box>
          <TextField
            autoFocus
            required
            id="categoria"
            select
            label="Categoria"
            fullWidth
            defaultValue="1"
            error={produto.categoria.length < 1}
            value={produto.categoria}
            onChange={(e) => {
              setProduto({
                ...produto,
                categoria: e.target.value,
              });
            }}
          >
            {categorias.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => salvarProduto()}>Salvar</Button>
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
