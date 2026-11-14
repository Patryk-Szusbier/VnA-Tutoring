export type Field = "name" | "email" | "message";
export type Errors = Partial<Record<Field, string>>;

export function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Podaj imię i nazwisko.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Podaj adres e-mail w formacie nazwa@domena.pl.";
  if (!values.message.trim()) errors.message = "Napisz, w czym mogę pomóc.";
  return errors;
}
