export const example6502 = `; https://en.wikipedia.org/wiki/MOS_Technology_6502#Example_code
        ORG $0080
;
SRC     .WORD $0400     ;source string pointer
DST     .WORD $0500     ;destination string pointer
;
        ORG $0600       ;execution start address
;
TOLOWER LDY #$00        ;starting index
;
LOOP    LDA (SRC),Y     ;get from source string
        BEQ DONE        ;end of string
;
        CMP #'A'        ;if lower than UC alphabet...
        BCC SKIP        ;copy unchanged
;
        CMP #'Z'+1      ;if greater than UC alphabet...
        BCS SKIP        ;copy unchanged
;
        ORA #%00100000  ;convert to lower case
;
SKIP    STA (DST),Y     ;store to destination string
        INY             ;bump index
        BNE LOOP        ;next character
;
; NOTE: If Y wraps the destination string will be left in an undefined
;  state. We set carry to indicate this to the calling function.
;
        SEC             ;report string too long error &...
        RTS             ;return to caller
;
DONE    STA (DST),Y     ;terminate destination string
        CLC             ;report conversion completed &...
        RTS             ;return to caller
;
        .END`;

export const exampleZ80 = `; https://en.wikipedia.org/wiki/Zilog_Z80#Example_code
             org     1000h       ; Origin at 1000h
 memcpy      public
             push    af          ; Save AF like LDIR
 loop        ld      a,(hl)      ; Copy 1 source byte
             ld      (de),a      ; to its destination
             inc     hl          ; Bump source pointer
             ld      hl, 0x1234  ; Test hl in load
             inc     de          ; Bump dest pointer
             dec     bc          ; Count the copied byte
             ld      a,b         ; Test BC for zero
             or      c           ; If BC != 0,
             jp      nz,loop     ; repeat the loop
             pop     af          ; Restore AF
             ret                 ; Return
             end`;
