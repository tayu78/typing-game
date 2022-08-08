FROM golang:1.14.4
WORKDIR /go
ENV GO111MODULE=on
ENV GOPATH=
COPY go.mod go.sum ./
RUN go mod download

COPY . .
CMD ["go","run", "api.go"]